import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import { setStep } from "@/app-store/actions";
import { isMobile } from "@/helpers/application";
import theme from "@/styles/theme";
import { media } from "@/styles/utils";
import AttendantForm from "./attendant-form";
import BillingForm from "./billing-form";
import HousingForm from "./housing-form";
import ReviewOrder from "./review-order";
import { styles } from "./components";

const FormWrapper = styled.div`
	width: 100%;
	background-color: #f9fafd;
	box-shadow: ${theme.shadows[3]};
	padding-bottom: 80px;

	${media.md`
		width: 650px;
		padding-bottom: 0;
	`}
`;
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
`;

const FormContent = styled.div`
	display: none;
	${media.md`
		display: block;
		padding: 20px;
	`}
`;

const FormActions = styled.div`
	padding-top: 8px;
	border-top: 1px solid ${props => props.theme.primary.main} ${media.md`
		padding: 10px 20px;
		text-align: right;
		background-color: ${props => props.theme.grey[200]}
	`};
`;

const InternalForm = ({ classes, event, nextStep, prevStep, step, width }) => {
	if (Object.keys(event).length < 1) {
		return null;
	}

	let content = <AttendantForm />;
	let title = "Step 1: Register attendants";

	switch (step) {
		case 2:
			content = <HousingForm />;
			title = "Step 2: Choose housing";
			break;
		case 3:
			content = <ReviewOrder />;
			title = "Step 3: Review";
			break;
		case 4:
			content = <BillingForm />;
			title = "Step 4: Billing information";
			break;
	}
	const FormNav = () => (
		<FormActions>
			{step > 1 && (
				<Button className="mr-10" onClick={e => prevStep(e)}>
					Back
				</Button>
			)}
			{step < 4 && (
				<Button variant="contained" color="primary" onClick={e => nextStep(e)}>
					Next
				</Button>
			)}
		</FormActions>
	);

	const Steps = () => {
		const steps = ["Attendants", "Housing", "Review", "Payment"];
		return (
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
								<FormNav />
							</StepContent>
						)}
					</Step>
				))}
			</Stepper>
		);
	};

	return (
		<FormWrapper>
			<FormHeading>{event.title} Registration</FormHeading>

			<Steps />
			<FormContent>{content}</FormContent>
			{!isMobile(width) && <FormNav />}
		</FormWrapper>
	);
};

InternalForm.propTypes = {
	event: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
	return {
		event: state.event,
		step: state.event.step
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch: dispatch
	};
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { step } = stateProps;
	const { dispatch } = dispatchProps;

	return {
		...ownProps,
		...stateProps,
		...dispatchProps,
		prevStep: e => {
			e.preventDefault();
			if (step - 1 < 1) {
				return false;
			}
			dispatch(setStep(step - 1));
		},
		nextStep: e => {
			e.preventDefault();
			if (step + 1 > 4) {
				return false;
			}
			dispatch(setStep(step + 1));
		}
	};
};
const Form = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(withStyles(styles)(withWidth()(InternalForm)));

export default Form;
