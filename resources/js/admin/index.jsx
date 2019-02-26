import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, NavLink } from "react-router-dom"
import styled from "styled-components"

import Events from "./events/index"
import Navigation from "./components/navigation"
import { media } from "@/styles/utils"

const Content = styled.div`
	margin-top: 75px;
	${media.md`
		margin-left: 220px;
	`}
`

const InternalAdmin = ({ history }) => {
	return (
		<div>
			<ConnectedRouter history={history}>
				<div>
					<Navigation />
					<Content>
						<Route path="/admin" component={Events} />
					</Content>
				</div>
			</ConnectedRouter>
		</div>
	)
}

InternalAdmin.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Admin = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalAdmin)

export default Admin
