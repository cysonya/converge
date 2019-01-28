
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from "styled-components"

import { media } from "@/styles/utils"
import AttendantForm from "./attendant-form"

const FormWrapper = styled.div`
	width: 100%;
	${media.md`
		width: 650px;
		background-color: #fff;
	`}
`
const FormHeading = styled.h4`
	margin: 0;
	padding: 10px 20px;
	font-size: 20px;
	font-weight: normal;
	color: white;
	background-color: ${props => props.theme.grey[900]};
`

const FormContent = styled.div`
	padding: 20px;
`
const InternalForm = ({ event, step }) => {
	if (Object.keys(event).length < 1) {
		return null
	}

	let form = <AttendantForm />
	let title = "Step 1: Register attendants"
	// switch(step) {
	// 	case 1:
	// 	default:

	// }

	return (
		<FormWrapper>
			<FormHeading>{title}</FormHeading>
			<FormContent>
				{form}
			</FormContent>
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
)(InternalForm)

export default Form