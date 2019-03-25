import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, NavLink } from "react-router-dom"
import styled from "styled-components"

import { media } from "@/styles/utils"

import LoadEvents from "./load-events"
import LoadEvent from "./load-event"
import ModalConductor from "./modal-conductor"
import Navigation from "./components/navigation"

const Content = styled.div`
	${media.md`
		margin-left: 230px;
		max-width: 1020px;
	`}
`
const InternalAdmin = ({ history }) => {
	return (
		<div>
			<ConnectedRouter history={history}>
				<div>
					<Navigation />
					<Content>
						<Route exact path="/admin" component={LoadEvents} />
						<Route
							path="/admin/event/:eventId/dashboard"
							component={LoadEvent}
						/>
						<Route
							path="/admin/event/:eventId/packages"
							component={LoadEvent}
							key="pkg"
						/>
						<Route
							key="pkg-edit"
							path="/admin/event/:eventId/packages/:packageId/edit"
							render={props => (
								<ModalConductor model="package-edit" {...props} />
							)}
						/>
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
