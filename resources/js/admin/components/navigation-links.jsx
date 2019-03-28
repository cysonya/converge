import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import EventIcon from "@material-ui/icons/Event"
import FaceIcon from "@material-ui/icons/Face"
import GroupIcon from "@material-ui/icons/Group"
import HomeIcon from "@material-ui/icons/Home"
import PollIcon from "@material-ui/icons/Poll"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import SettingsIcon from "@material-ui/icons/Settings"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { Route, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import styled from "styled-components"

const styles = theme => ({
	drawerMenu: {
		marginTop: "40px",
		paddingLeft: "30px"
	},
	menuItem: {
		marginBottom: "10px",
		padding: 0
	},
	menuBack: {
		marginBottom: "30px",
		padding: 0
	}
})
const LinkStyled = styled(NavLink)`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 5px 10px 5px 20px;
	font-size: 14px;
	color: #fff;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	&.active {
		background-color: ${props => props.theme.primary.main};
	}
`
const InternalNavigationLinks = ({ classes, eventId }) => {
	return eventId && window.location.pathname.includes("event") ? (
		<List className={classes.drawerMenu}>
			<ListItem className={classes.menuBack}>
				<LinkStyled exact to={`/admin`}>
					<ArrowBackIcon className="pr-5" />
					Back
				</LinkStyled>
			</ListItem>

			<ListItem className={classes.menuItem}>
				<LinkStyled to={`/admin/events/${eventId}/dashboard`}>
					<PollIcon className="pr-5" />
					Dashboard
				</LinkStyled>
			</ListItem>
			<ListItem className={classes.menuItem}>
				<LinkStyled to={`/admin/events/${eventId}/packages`}>
					<HomeIcon className="pr-5" />
					Housings
				</LinkStyled>
			</ListItem>
			<ListItem className={classes.menuItem}>
				<LinkStyled to={`/admin/events/${eventId}/groups`}>
					<GroupIcon className="pr-5" />
					Groups
				</LinkStyled>
			</ListItem>
			<ListItem className={classes.menuItem}>
				<LinkStyled to={`/admin/events/${eventId}/attendants`}>
					<FaceIcon className="pr-5" />
					Participants
				</LinkStyled>
			</ListItem>
			<ListItem className={classes.menuItem}>
				<LinkStyled to={`/admin/events/${eventId}/orders`}>
					<ShoppingCartIcon className="pr-5" />
					Orders
				</LinkStyled>
			</ListItem>
			<ListItem className={classes.menuItem}>
				<LinkStyled to={`/admin/events/${eventId}/settings`}>
					<SettingsIcon className="pr-5" />
					Settings
				</LinkStyled>
			</ListItem>
		</List>
	) : (
		<List className={classes.drawerMenu}>
			<ListItem className={classes.menuItem}>
				<LinkStyled exact to="/admin">
					<EventIcon className="pr-5" />
					EVENTS
				</LinkStyled>
			</ListItem>
		</List>
	)
}

InternalNavigationLinks.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		eventId: state.dashboard.event ? state.dashboard.event.id : null
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const NavigationLinks = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalNavigationLinks)

export default withStyles(styles)(NavigationLinks)
