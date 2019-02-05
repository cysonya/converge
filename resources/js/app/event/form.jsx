import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
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

import { placeOrder, removeOrderError, setStep } from "@/app-store/actions"
import { isMobile } from "@/helpers/application"
import theme from "@/styles/theme"
import { media } from "@/styles/utils"
import AttendantForm from "./attendant-form"
import BillingForm from "./billing-form"
import FormNav from "./form-nav"
import HousingForm from "./housing-form"
import ReviewOrder from "./review-order"

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
	},
	error: {
		color: "white",
		backgroundColor: theme.palette.error.dark,
		[theme.breakpoints.up("md")]: {
			marginLeft: "20px",
			marginRight: "20px",
			maxWidth: "none",
			boxShadow: theme.shadows[2]
		}
	},
	errorClose: {
		padding: 0
	}
})

const FormWrapper = styled.div`
	width: 100%;
	background-color: #f9fafd;
	box-shadow: ${theme.shadows[3]};
	padding-bottom: 80px;

	${media.md`
		width: 650px;
		padding-bottom: 0;
	`}
`
const FormHeading = styled.h4`
	margin: 0;
	padding: 20px 10px 0;
	font-size: 18px;
	font-weight: normal;
	text-align: center;
	${media.md`
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
	closeError,
	doPlaceOrder,
	error,
	event,
	step,
	stripe,
	width
}) => {
	if (Object.keys(event).length < 1) {
		return null
	}

	function ErrorAlert() {
		let errorContent = (
			<SnackbarContent
				className={classes.error}
				aria-describedby="error-message"
				message={error}
				action={[
					<IconButton
						className={classes.errorClose}
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => closeError()}
					>
						<CloseIcon />
					</IconButton>
				]}
			/>
		)
		if (isMobile(width)) {
			return (
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open
					onClose={() => closeError()}
				>
					{errorContent}
				</Snackbar>
			)
		} else {
			return errorContent
		}
	}

	const initialValues = {
		registrants: [
			{
				color: "#F3A712",
				first_name: "",
				last_name: "",
				email: "",
				group: "",
				package: "",
				roommates: "",
				dietary: ""
			}
		],
		payment: {
			cardName: "",
			cardNumber: "",
			cardExpiry: "",
			cardCvc: "",
			postalCode: ""
		},
		customer_first_name: "",
		customer_last_name: "",
		customer_email: "",
		donation: ""
	}

	const handleValidate = values => {
		let errors = {}

		if (!values.payment.cardName) {
			errors.payment = Object.assign(
				{ cardName: "Provide valid card details" },
				errors.payment
			)
		}
		if (!values.payment.cardNumber) {
			errors.payment = Object.assign(
				{ cardNumber: "Provide valid card details" },
				errors.payment
			)
		}
		if (!values.payment.cardNumbercardExpiry) {
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
		// remove payment errors if completed
		if (errors.payment) {
			for (let err in errors.payment) {
				if (values.payment[err] === "complete") {
					delete errors.payment[err]
				}
			}
			if (Object.keys(errors.payment).length === 0) {
				delete errors.payment
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

		// Registrants validation
		let valid = true
		errors.registrants = []
		values.registrants.forEach((registrant, i) => {
			let error = {}

			if (!registrant.first_name) {
				error.first_name = "Provide first name"
				valid = false
			}
			if (!registrant.last_name) {
				error.last_name = "Provide last name"
				valid = false
			}
			if (!registrant.email) {
				error.email = "Provide email"
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registrant.email)
			) {
				error.email = "Invalid email address"
			}
			if (!registrant.group) {
				error.group = "Select age group"
				valid = false
			}
			if (!registrant.package) {
				error.package = "Select housing"
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
			<FormHeading>{event.title} Registration</FormHeading>

			<Formik
				initialValues={initialValues}
				validate={values => {
					return handleValidate(values)
				}}
				onSubmit={(values, { setSubmitting }) => {
					stripe
						.createToken({ name: values.payment.cardName })
						.then(({ error, token }) => {
							console.log("Stripe TOKEN: ", token)
							console.log("Stripe ERRORS: ", error)
							if (!!token) {
								values.stripeToken = token.id
								values.customer_email = values.registrants[0].email
								values.customer_first_name =
									values.registrants[0].customer_first_name
								values.customer_last_name =
									values.registrants[0].customer_last_name

								doPlaceOrder(values, setSubmitting)
							}
						})
				}}
				render={({
					errors,
					setFieldValue,
					setFieldTouched,
					setFieldError,
					touched,
					values
				}) => {
					const steps = ["Attendants", "Housing", "Review", "Payment"]
					let content = <AttendantForm {...{ errors, touched, values }} />
					const getContent = stepIndex => {
						switch (stepIndex) {
							case 2:
								content = <HousingForm {...{ errors, touched, values }} />
								break
							case 3:
								content = (
									<ReviewOrder
										{...{ errors, setFieldValue, touched, values }}
									/>
								)
								break
							case 4:
								content = (
									<BillingForm
										{...{
											errors,
											setFieldValue,
											setFieldTouched,
											setFieldError,
											touched,
											values
										}}
									/>
								)
								break
						}
						return content
					}
					console.log("VALUES: ", values)
					console.log("ERRORS: ", errors)
					console.log("TOUCHED: ", touched)

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
												<FormNav {...{ errors, touched, values }} />
											</StepContent>
										) : null}
									</Step>
								))}
							</Stepper>
							{!!error && <ErrorAlert />}

							{!isMobile(width) ? (
								<div>
									<FormContent>{getContent(step)}</FormContent>
									<FormNav {...{ errors, touched, values }} />
								</div>
							) : null}
						</Form>
					)
				}}
			/>
		</FormWrapper>
	)
}

InternalEventForm.propTypes = {
	event: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
	return {
		error: state.order.error,
		event: state.event,
		step: state.event.step,
		stripe: ownProps.stripe
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		doPlaceOrder: (values, setSubmitting) => {
			dispatch(placeOrder(values, setSubmitting))
		},
		closeError: () => {
			dispatch(removeOrderError())
		}
	}
}

const EventForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalEventForm)))

export default injectStripe(EventForm)
