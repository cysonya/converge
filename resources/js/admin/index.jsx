import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Navigation from "./components/navigation"

const InternalDashboard = ({}) => {
	return (
		<div>
			<Navigation />
		</div>
	)
}

InternalDashboard.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalDashboard)

export default Dashboard
