import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalDashboard = ({ event }) => {
	return (
		<div>
			<h1>{event.title}</h1>
		</div>
	)
}

InternalDashboard.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		event: state.event
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalDashboard)

export default Dashboard
