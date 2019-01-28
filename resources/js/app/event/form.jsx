
import Button from '@material-ui/core/Button'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from "styled-components"

import theme from "@/styles/theme"
import { media } from "@/styles/utils"
import AttendantForm from "./attendant-form"
import HousingForm from "./housing-form"

const FormWrapper = styled.div`
	width: 100%;
	background-color: #fdfdfd;
	box-shadow: ${theme.shadows[3]};

	${media.md`
		width: 650px;
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

const FormFooter = styled.div`
	padding: 10px 20px;
	text-align: right;
	border-top: 1px solid ${props => props.theme.primary.main}
	background-color: ${props => props.theme.grey[200]}
`
const InternalForm = ({ event, step }) => {
	if (Object.keys(event).length < 1) {
		return null
	}

	let form = <AttendantForm />
	let title = "Step 1: Register attendants"

	switch(step) {
		case 2:
			form = <HousingForm />
			title = "Step 2: Choose housing"
			break;
	}

	return (
		<FormWrapper>
			<FormHeading>{title}</FormHeading>
			<FormContent>
				{form}
			</FormContent>

			<FormFooter>
			  <Button className="mr-10">Back</Button>
			  <Button variant="contained" color="primary">Next</Button>
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
    step: 2
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