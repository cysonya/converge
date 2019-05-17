import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalAttendantsCreate = ({}) => {
	return (
		<div>
			<h1>Hello</h1>
		</div>
	)
}

InternalAttendantsCreate.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const AttendantsCreate = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalAttendantsCreate)

export default AttendantsCreate
