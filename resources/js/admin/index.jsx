import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import styled from "styled-components";

import { media } from "@/styles/utils";

import LoadEvents from "./load-events";
import LoadEvent from "./load-event";
import ModalConductor from "./modal-conductor";
import Navigation from "./components/navigation";
import Notifier from "./notifier";

const Content = styled.div`
	${media.md`
		margin-left: 230px;
		margin-right: 30px;
		max-width: 1020px;
	`}
`;
const InternalAdmin = ({ history }) => {
	return (
		<div>
			<ConnectedRouter history={history}>
				<div>
					<Notifier />
					<Navigation />
					<Content>
						<Route exact path="/admin" component={LoadEvents} />
						<Route
							path="/admin/events/:eventId/dashboard"
							component={LoadEvent}
						/>
						<Route
							path="/admin/events/:eventId/packages"
							component={LoadEvent}
						/>
						<Route
							path="/admin/events/:eventId/packages/:packageId/edit"
							render={props => (
								<ModalConductor model="package-edit" {...props} />
							)}
						/>
						<Route
							path="/admin/events/:eventId/settings"
							component={LoadEvent}
						/>
					</Content>
				</div>
			</ConnectedRouter>
		</div>
	);
};

InternalAdmin.propTypes = {};

const mapStateToProps = (state, ownProps) => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

const Admin = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalAdmin);

export default Admin;
