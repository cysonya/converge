import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalDashboard = ({}) => {
	return <div>Hello</div>
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
