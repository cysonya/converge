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

const styles = theme => ({
	title: {
		marginLeft: "55px",
		color: "#fff"
	},
	paper: {
		borderRadius: "0"
	},
	count: {
		fontSize: "32px",
		color: theme.palette.primary.main
	},
	label: {
		fontSize: "14px",
		color: theme.palette.grey[600]
	},
	actions: {
		display: "inline-flex",
		verticalAlign: "middle",
		color: theme.palette.primary.lighter
	}
})
const Heading = styled.div`
	position: relative;
	padding: 10px;
	background-color: ${props => props.theme.common.background};
`
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

const Content = styled.div`
	padding: 10px 20px 20px;
	text-align: center;
`
const Footer = styled.div`
	padding: 10px;
	text-align: center;
	border-top: 1px solid ${props => props.theme.grey[300]};
	background-color: ${props => props.theme.grey[200]};
`

const InternalEventListings = ({ classes, events }) => {
	if (!events) return null
	return (
		<Grid container spacing={24}>
			{events.map((event, index) => (
				<Grid key={index} item xs={12} md={6} lg={4}>
					<Paper className={classes.paper}>
						<Heading>
							<EventDate>
								<EventMonth>AUG</EventMonth>
								<EventDay>02</EventDay>
							</EventDate>
							<Typography className={classes.title} variant="h6">
								{event.title}
							</Typography>
						</Heading>

						<Content>
							<Typography className={classes.count} variant="subtitle2">
								{event.attendants_count}
							</Typography>
							<Typography className={classes.label} variant="body1">
								Participants
							</Typography>
						</Content>
						<Footer>
							<Link
								component={NavLink}
								className={classes.actions}
								to={`/admin/events/${event.id}`}
							>
								<SettingsIcon className="mr-5" fontSize="small" /> Manage
							</Link>
						</Footer>
					</Paper>
				</Grid>
			))}
		</Grid>
	)
}

InternalEventListings.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		events: state.admin.eventsList
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
