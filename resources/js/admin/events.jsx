import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalEvents = ({}) => {
	return (
		<div>
			<h1>Events</h1>
		</div>
	)
}

InternalEvents.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Events = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalEvents)

export default Events
