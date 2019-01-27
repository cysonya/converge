import Typography from '@material-ui/core/Typography';
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from "styled-components"

import { media } from "@/styles/utils"

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`
const FormWrapper = styled.div`
	padding: 20px;
	background-color: #fff;
	${media.md`
		width: 650px;
	`}
`
const InternalForm = ({ event }) => {
	if (Object.keys(event).length < 1) {
		return null
	}
	return (
		<FormWrapper>
			<Typography variant="h4" align="center" gutterBottom>{event.title}</Typography>
			<Typography paragraph>Some description</Typography>
		</FormWrapper>
	)
}

InternalForm.propTypes = {
	event: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.event
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