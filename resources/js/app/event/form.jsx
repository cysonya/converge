import Button from "@material-ui/core/Button"
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
import styled from "styled-components"

import { setStep } from "@/app-store/actions"
import { getRandomColor, isMobile } from "@/helpers/application"
import theme from "@/styles/theme"
import { media } from "@/styles/utils"
import AttendantForm from "./attendant-form"
import BillingForm from "./billing-form"
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
	padding: 10px;
	font-size: 18px;
	font-weight: normal;
	color: white;
	text-align: center;
	background-color: ${props => props.theme.grey[900]};
	${media.md`
		font-size: 22px;
		padding: 12px 20px;
	`}
`

const FormContent = styled(Form)`
	display: none;
	${media.md`
		display: block;
		padding: 20px;
	`}
`

const FormActions = styled.div`
	padding-top: 8px;
	border-top: 1px solid ${props => props.theme.primary.main} ${media.md`
		padding: 10px 20px;
		text-align: right;
		background-color: ${props => props.theme.grey[200]}
	`};
`

const InternalEventForm = ({
	classes,
	event,
	nextStep,
	prevStep,
	step,
	width
}) => {
	if (Object.keys(event).length < 1) {
		return null
	}

	const FormNav = ({ errors, touched, values }) => {
		let disableNext = true
		if (typeof errors.registrants !== "undefined") {
			if (step === 1) {
				errors.registrants.forEach((registrant, i) => {
					disableNext =
						Object.keys(registrant).length !== 1 &&
						Object.keys(registrant).includes("package")
					console.log("REG: ", registrant)
				})
			}
		}
		return (
			<FormActions>
				{step > 1 && (
					<Button className="mr-10" onClick={e => prevStep(e)}>
						Back
					</Button>
				)}
				{step < 4 && (
					<Button
						variant="contained"
						color="primary"
						onClick={e => nextStep(e)}
						disabled={disableNext}
					>
						Next
					</Button>
				)}
			</FormActions>
		)
	}

	const steps = ["Attendants", "Housing", "Review", "Payment"]
	const initialValues = {
		registrants: [
			{
				color: getRandomColor(),
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
			address: "",
			city: "",
			state: "",
			country: "",
			zip: "",
			cardName: "",
			cardNum: "",
			expiry: "",
			cvc: ""
		},
		customer_first_name: "",
		customer_last_name: "",
		customer_email: "",
		donation: 0
	}

	const handleValidate = values => {
		let errors = {}

		// Customer validation
		// if (!values.customer_first_name) {
		// 	errors.customer_first_name = "Provide first name"
		// }
		// if (!values.customer_last_name) {
		// 	errors.customer_last_name = "Provide last name"
		// }
		// if (!values.customer_email) {
		// 	errors.customer_email = "Provide email"
		// } else if (
		// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.customer_email)
		// ) {
		// 	errors.customer_email = "Invalid email address"
		// }

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
					return true
				}}
				render={({ errors, touched, values }) => {
					let content = <AttendantForm {...{ errors, touched, values }} />
					let title = "Step 1: Register attendants"

					switch (step) {
						case 2:
							content = <HousingForm {...{ errors, touched, values }} />
							title = "Step 2: Choose housing"
							break
						case 3:
							content = <ReviewOrder {...{ errors, touched, values }} />
							title = "Step 3: Review"
							break
						case 4:
							content = <BillingForm {...{ errors, touched, values }} />
							title = "Step 4: Billing information"
							break
					}
					console.log("VALUES: ", values)
					console.log("ERRORS: ", errors)
					console.log("TOUCHED: ", touched)

					return (
						<div>
							<Stepper
								activeStep={step - 1}
								alternativeLabel={isMobile(width) ? false : true}
								className={classes.stepper}
								orientation={isMobile(width) ? "vertical" : "horizontal"}
							>
								{steps.map(label => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
										{isMobile(width) && (
											<StepContent className={classes.stepContent}>
												{content}
												<FormNav {...{ errors, touched, values }} />
											</StepContent>
										)}
									</Step>
								))}
							</Stepper>

							<FormContent>{content}</FormContent>
							{!isMobile(width) && <FormNav {...{ errors, touched, values }} />}
						</div>
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
		event: state.event,
		step: state.event.step
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch: dispatch
	}
}
const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { step } = stateProps
	const { dispatch } = dispatchProps

	return {
		...ownProps,
		...stateProps,
		...dispatchProps,
		prevStep: e => {
			e.preventDefault()
			if (step - 1 < 1) {
				return false
			}
			dispatch(setStep(step - 1))
		},
		nextStep: e => {
			e.preventDefault()
			if (step + 1 > 4) {
				return false
			}
			dispatch(setStep(step + 1))
		}
	}
}
const EventForm = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(withStyles(styles)(withWidth()(InternalEventForm)))

export default EventForm
