import Button from "@material-ui/core/Button"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { getIn } from "formik"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { panelComplete, panelIncomplete, setStep } from "@/app-store/actions"
import { media } from "@/styles/utils"

const FormActions = styled.div`
	padding-top: 8px;
	border-top: 1px solid ${props => props.theme.primary.main} ${media.md`
		padding: 10px 20px;
		text-align: right;
		background-color: ${props => props.theme.grey[200]}
	`};
`

const InternalFormNav = ({ formProps, nextStep, panels, prevStep, step }) => {
	// flag to enable/disable next button
	// Ensures fields are touched to show proper validation on page load
	let hasErrors = !!!formProps.touched.registrants

	// Step 1 & 2: Check if registrant fields have errors
	if (step < 2 && !hasErrors) {
		hasErrors = formProps.values.registrants.some((registrant, i) => {
			return panels[step].fields.some(field => {
				return getIn(formProps.errors, `registrants[${i}][${field}]`)
			})
		})
	}
	// If registrant does not have errors, check if other fields like payment, donation have errors
	if (!hasErrors) {
		hasErrors = panels[step].fields.some(field => {
			return getIn(formProps.errors, field)
		})
	}

	console.log("LAST CHECK ", hasErrors)

	return (
		<FormActions>
			{step > 0 && (
				<Button className="mr-10" onClick={e => prevStep(e)}>
					<ChevronLeftIcon size="small" /> Back
				</Button>
			)}
			{step < 3 && (
				<Button
					variant="contained"
					color="primary"
					onClick={e => nextStep(e)}
					disabled={hasErrors}
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
		panels: state.panels,
		step: state.event.step
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch
	}
}
const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { formProps } = ownProps
	const { panels, step } = stateProps
	const { dispatch } = dispatchProps

	return {
		...ownProps,
		...stateProps,
		...dispatchProps,
		prevStep: e => {
			e.preventDefault()
			if (step - 1 < 0) {
				return false
			}
			dispatch(setStep(step - 1))
		},
		nextStep: e => {
			e.preventDefault()
			if (step > 3) {
				return false
			}

			if (step === 1 && typeof FS !== "undefined") {
				FS.setUserVars({
					displayName: `${
						ownProps.formProps.values.registrants[0].first_name
					} ${ownProps.formProps.values.registrants[0].last_name}`,
					email: ownProps.formProps.values.customer_email
				})
			}

			dispatch(setStep(step + 1))
		},
		markPanelComplete: () => {
			console.log("MARKED COMPLETE")
			dispatch(panelComplete(step))
		},
		markPanelIncomplete: () => {
			console.log("MARKED not COMPLETE")
			dispatch(panelIncomplete(step))
		}
	}
}

const FormNav = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(InternalFormNav)

export default FormNav
