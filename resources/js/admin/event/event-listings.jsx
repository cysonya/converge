import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import SettingsIcon from "@material-ui/icons/Settings"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { CardHeading, CardContent, CardFooter, styles } from "./components"

const EventDate = styled.div`
	position: absolute;
	top: -12px;
	padding: 8px;
	width: 45px;
	text-align: center;
	background-color: #fff;
	border: 1px solid ${props => props.theme.common.background};
`
const EventMonth = styled.div`
	font-size: 12px;
	font-weight: 300;
`
const EventDay = styled.div`
	font-size: 18px;
`

const InternalEventListings = ({ classes, events }) => {
	if (!events) return null

	return (
		<Grid container spacing={24}>
			{events.map((event, index) => (
				<Grid key={index} item xs={12} md={6} lg={4}>
					<Paper className={classes.paper}>
						<CardHeading>
							<EventDate>
								<EventMonth>AUG</EventMonth>
								<EventDay>02</EventDay>
							</EventDate>
							<Typography className={classes.eventTitle} variant="h6">
								{event.title}
							</Typography>
						</CardHeading>

						<CardContent>
							<Typography className={classes.statsVal} variant="subtitle2">
								{event.attendants_count}
							</Typography>
							<Typography className={classes.statsLabel} variant="body1">
								Participants
							</Typography>
						</CardContent>
						<CardFooter>
							<Link
								component={NavLink}
								className={classes.footerLink}
								to={`/admin/events/${event.id}/dashboard`}
							>
								<SettingsIcon className="mr-5" fontSize="small" /> Manage
							</Link>
						</CardFooter>
					</Paper>
				</Grid>
			))}
		</Grid>
	)
}

InternalEventListings.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		events: state.eventListings
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const EventListings = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalEventListings)

export default withStyles(styles)(EventListings)
