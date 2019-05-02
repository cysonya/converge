import Step from "@material-ui/core/Step"
import Stepper from "@material-ui/core/Stepper"
import StepContent from "@material-ui/core/StepContent"
import StepLabel from "@material-ui/core/StepLabel"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import { Form, Formik } from "formik"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Elements, injectStripe } from "react-stripe-elements"
import styled from "styled-components"

import ContactSupport from "@/app/contact-support"
import { placeOrder, setStep, updateOrder } from "@/app-store/actions"
import { isMobile } from "@/helpers/application"
import theme from "@/styles/theme"
import { media } from "@/styles/utils"
import AttendantForm from "./attendant-form"
import ErrorAlert from "./error-alert"
import PaymentForm from "./payment-form"
import FormNav from "./form-nav"
import HousingForm from "./housing-form"
import OrderComplete from "./order-complete"
import OrderReview from "./order-review"

const styles = theme => ({
	stepper: {
		padding: "24px 10px",
		backgroundColor: "transparent",
		[theme.breakpoints.up("md")]: {
			padding: "24px"
		}
	},
	stepContent: {
		paddingLeft: "10px",
		paddingRight: "0"
	}
})

const FormWrapper = styled.div`
	width: 100%;
	background-color: #f7f7f7;
	box-shadow: ${theme.shadows[3]};
	padding-bottom: 80px;

	${media.md`
		width: 650px;
		padding-bottom: 0;
	`}
`
const FormHeading = styled.h4`
	margin: ${props => (props.complete ? "0 0 20px" : "0")};
	padding: 20px 10px 0;
	font-size: 18px;
	font-weight: normal;
	text-align: center;
	${media.md`
		margin: 0;
		padding: 12px 20px;
		color: white;
		font-size: 22px;
		background-color: ${props => props.theme.grey[900]};
	`}
`

const FormContent = styled.div`
	padding: 20px;
`

const InternalEventForm = ({
	classes,
	doPlaceOrder,
	error,
	event,
	getStepContent,
	initialValues,
	showError,
	status,
	step,
	steps,
	stripe,
	updateOrderStatus,
	width
}) => {
	if (Object.keys(event).length < 1) {
		return null
	}

	const handleValidate = values => {
		let errors = {}

		// if (!values.payment.cardName) {
		// 	errors.payment = Object.assign(
		// 		{ cardName: "Provide valid card details" },
		// 		errors.payment
		// 	)
		// }
		if (!values.payment.cardNumber) {
			errors.payment = Object.assign(
				{ cardNumber: "Provide valid card details" },
				errors.payment
			)
		}
		if (!values.payment.cardExpiry) {
			errors.payment = Object.assign(
				{ cardExpiry: "Provide valid card details" },
				errors.payment
			)
		}
		if (!values.payment.cardCvc) {
			errors.payment = Object.assign(
				{ cardCvc: "Provide valid card details" },
				errors.payment
			)
		}
		if (!values.payment.postalCode) {
			errors.payment = Object.assign(
				{ postalCode: "Provide valid card details" },
				errors.payment
			)
		}

		// Validate payment errors for stripe element
		for (let field in values.payment) {
			if (values.payment[field] === "complete") {
				if (errors.payment) {
					delete errors.payment[field]
				}
			} else {
				let err = {}
				err[field] = values.payment[field]
				errors.payment = Object.assign(err, errors.payment)
			}
		}

		// Only validate donation if amount is entered
		if (!!values.donation) {
			if (isNaN(values.donation)) {
				errors.donation = "Enter a number"
			} else if (!/^\d+$/.test(parseFloat(values.donation))) {
				errors.donation = "Whole numbers only"
			}
		}
		// Customer email validation
		if (!values.customer_email) {
			errors.customer_email = "Provide email"
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.customer_email)
		) {
			errors.customer_email = "Invalid email address"
		}

		// Registrants validation
		let valid = true
		errors.registrants = []
		values.registrants.forEach((registrant, i) => {
			let error = {}

			if (!registrant.first_name.trim()) {
				error.first_name = "Provide first name"
				valid = false
			}
			if (!registrant.last_name.trim()) {
				error.last_name = "Provide last name"
				valid = false
			}

			if (!registrant.group) {
				error.group = "Select age group"
				valid = false
			}
			if (!registrant.package) {
				error.package = "Select housing"
				valid = false
			}
			if (!registrant.affiliate) {
				error.affiliate = "Select affiliation"
				valid = false
			}
			if (registrant.affiliate === "Other" && !registrant.affiliate_other) {
				error.affiliate_other = "Please specify affiliation"
				valid = false
			}
			errors.registrants[i] = error
		})
		if (valid) {
			delete errors.registrants
		}
		return errors
	}

	return (
		<FormWrapper>
			<FormHeading complete={status === "complete"}>
				{event.title} Registration
			</FormHeading>

			<Formik
				initialValues={initialValues}
				validate={values => {
					return handleValidate(values)
				}}
				onSubmit={(values, { setSubmitting }) => {
					updateOrderStatus()
					stripe.createToken().then(({ error, token }) => {
						console.log("Stripe TOKEN: ", token)
						console.log("Stripe ERRORS: ", error)
						if (!!error) {
							showError(error.message)
							setSubmitting(false)
						}
						if (!!token) {
							values.stripeToken = token.id
							values.customer_first_name = values.registrants[0].first_name
							values.customer_last_name = values.registrants[0].last_name

							// Set fullstory names
							if (typeof FS !== "undefined") {
								FS.setUserVars({
									displayName: `${values.customer_first_name} ${
										values.customer_last_name
									}`,
									email: values.customer_email
								})
							}

							doPlaceOrder(values, setSubmitting)
						}
					})
				}}
				render={props => {
					const steps = ["Participants", "Housing", "Review", "Payment"]
					let content = <AttendantForm formProps={props} />
					const getContent = stepIndex => {
						switch (stepIndex) {
							case 2:
								content = <HousingForm formProps={props} />
								break
							case 3:
								content = <OrderReview formProps={props} />
								break
							case 4:
								content = <PaymentForm formProps={props} />
								break
						}
						return content
					}

					if (status === "complete") {
						return <OrderComplete />
					}

					// console.log("VALUES: ", values)
					// console.log("ERRORS: ", errors)
					// console.log("TOUCHED: ", touched)
					return (
						<Form>
							<Stepper
								activeStep={step - 1}
								alternativeLabel={isMobile(width) ? false : true}
								className={classes.stepper}
								orientation={isMobile(width) ? "vertical" : "horizontal"}
							>
								{steps.map((label, index) => (
									<Step key={index}>
										<StepLabel>{label}</StepLabel>

										{isMobile(width) ? (
											<StepContent className={classes.stepContent}>
												{getContent(index + 1)}
												<FormNav formProps={props} />
											</StepContent>
										) : null}
									</Step>
								))}
							</Stepper>

							{!!error && <ErrorAlert />}

							{!isMobile(width) && (
								<div>
									<FormContent>{getContent(step)}</FormContent>
									<FormNav formProps={props} />
								</div>
							)}
						</Form>
					)
				}}
			/>
			<ContactSupport />
		</FormWrapper>
	)
}

InternalEventForm.propTypes = {
	event: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
	const initialValues = {
		registrants: [
			{
				color: "#F3A712",
				first_name: "",
				last_name: "",
				group: "",
				package: "",
				roommates: "",
				dietary: "",
				affiliate: "",
				affiliate_other: ""
			}
		],
		payment: {
			cardNumber: "",
			cardExpiry: "",
			cardCvc: "",
			postalCode: ""
		},
		customer_first_name: "",
		customer_last_name: "",
		customer_email: "",
		donation: 0
	}
	return {
		initialValues,
		error: state.order.error,
		status: state.order.status,
		event: state.event,
		step: state.event.step,
		steps: state.steps,
		stripe: ownProps.stripe
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		doPlaceOrder: (values, setSubmitting) => {
			dispatch(placeOrder(values, setSubmitting))
		},
		showError: error => {
			dispatch(updateOrder({ status: "incomplete", error: error }))
		},
		updateOrderStatus: () => {
			dispatch(updateOrder({ status: "processing" }))
		}
	}
}

const EventForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalEventForm)))

export default injectStripe(EventForm)
