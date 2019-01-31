import Button from "@material-ui/core/Button"
import Step from "@material-ui/core/Step"
import Stepper from "@material-ui/core/Stepper"
import StepContent from "@material-ui/core/StepContent"
import StepLabel from "@material-ui/core/StepLabel"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { isMobile } from "@/helpers/application"
import theme from "@/styles/theme"
import { media } from "@/styles/utils"
import AttendantForm from "./attendant-form"
import BillingForm from "./billing-form"
import HousingForm from "./housing-form"
import ReviewOrder from "./review-order"
import { styles } from "./components"

const FormWrapper = styled.div`
	width: 100%;
	background-color: #f9fafd;
	box-shadow: ${theme.shadows[3]};

	${media.md`
		width: 650px;
	`}
`
const FormHeading = styled.h4`
	margin: 0;
	padding: 10px;
	font-size: 18px;
	font-weight: normal;
	color: white;
	background-color: ${props => props.theme.grey[900]};
	${media.md`
		padding: 10px 20px;
	`}
`

const FormContent = styled.div`
	display: none;
	${media.md`
		display: block;
		padding: 20px;
	`}
`

const FormFooter = styled.div`
	padding: 10px;
	text-align: right;
	border-top: 1px solid ${props => props.theme.primary.main}
	background-color: ${props => props.theme.grey[200]}
	${media.md`
		padding: 10px 20px;
	`}
`

const EventTitle = styled.h1`
	margin: 0;
	padding: 10px;
	font-weight: 500;
	text-align: center;
	font-size: 18px;
	font-weight: normal;
	color: white;
	background-color: ${props => props.theme.grey[900]};

	${media.md`
		padding: 20px;
		font-size: 24px;
		color: #212121;
		background-color: transparent;

	`}
`
const InternalForm = ({ classes, event, step, width }) => {
	if (Object.keys(event).length < 1) {
		return null
	}

	const Steps = () => {
		const steps = ["Attendants", "Housing", "Review", "Payment"]
		return (
			<Stepper
				activeStep={step - 1}
				alternativeLabel={isMobile(width) ? false : true}
				className={classes.stepWrapper}
				orientation={isMobile(width) ? "vertical" : "horizontal"}
			>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						{isMobile(width) && <StepContent>{content}</StepContent>}
					</Step>
				))}
			</Stepper>
		)
	}

	let content = <AttendantForm />
	let title = "Step 1: Register attendants"

	switch (step) {
		case 2:
			content = <HousingForm />
			title = "Step 2: Choose housing"
			break
		case 3:
			content = <ReviewOrder />
			title = "Step 3: Review"
			break
		case 4:
			content = <BillingForm />
			title = "Step 4: Billing information"
			break
	}

	return (
		<FormWrapper>
			<EventTitle>{event.title} Registration</EventTitle>
			<Steps />

			<FormContent>{content}</FormContent>
			<FormFooter>
				<Button className="mr-10">Back</Button>
				<Button variant="contained" color="primary">
					Next
				</Button>
			</FormFooter>
		</FormWrapper>
	)
}

InternalForm.propTypes = {
	event: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
	return {
		event: state.event,
		step: 1
	}
}

const mapDispatchToProps = (dispatch, ownPros) => {
	return {}
}

const Form = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalForm)))

export default Form
