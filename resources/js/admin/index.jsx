import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, NavLink } from "react-router-dom"

import Navigation from "./components/navigation"

const Content = () => <div>hello</div>
const InternalDashboard = ({ history }) => {
	return (
		<div>
			<ConnectedRouter history={history}>
				<div>
					<Navigation />
					<Route path="/admin/dashboard" component={Content} />
				</div>
			</ConnectedRouter>
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
