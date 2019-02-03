import Button from "@material-ui/core/Button"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { setStep } from "@/app-store/actions"
import { media } from "@/styles/utils"

const FormActions = styled.div`
	padding-top: 8px;
	border-top: 1px solid ${props => props.theme.primary.main} ${media.md`
		padding: 10px 20px;
		text-align: right;
		background-color: ${props => props.theme.grey[200]}
	`};
`

const InternalFormNav = ({
	errors,
	nextStep,
	prevStep,
	step,
	touched,
	values
}) => {
	// flag to enable/disable next button
	let showNext = true

	// Show next btn if all inputs in current step are valid
	if (step === 1) {
		showNext = false
		if (errors.registrants) {
			const requiredKeys = ["first_name", "last_name", "email", "group"]

			for (let registrant of errors.registrants) {
				// show next btn if requiredKeys are not found in errors
				showNext = !requiredKeys.some(k => Object.keys(registrant).includes(k))

				// Prevents next valid case from overriding error check
				if (!showNext) {
					break
				}
			}
		} else {
			// Set showNext to true on 'back' if no errors. Checking if registrants fields have been touched also prevents showNext to be true on initial load when there's no errors
			showNext = !!touched.registrants
		}
	}
	if (step === 2) {
		// Show next if no registrants errors
		showNext = !!!errors.registrants
	}

	if (step === 3) {
		if (!!errors.donation) {
			showNext = false
		}
	}

	return (
		<FormActions>
			{step > 1 && (
				<Button className="mr-10" onClick={e => prevStep(e)}>
					<ChevronLeftIcon size="small" /> Back
				</Button>
			)}
			{step < 4 && (
				<Button
					variant="contained"
					color="primary"
					onClick={e => nextStep(e)}
					disabled={!showNext}
				>
					Next <ChevronRightIcon size="small" />
				</Button>
			)}
		</FormActions>
	)
}

InternalFormNav.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
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

const FormNav = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(InternalFormNav)

export default FormNav
