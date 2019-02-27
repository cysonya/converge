import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import React from "react"
import ReactDOM from "react-dom"
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
						<p>Attendants: {event.attendants_count}</p>
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
