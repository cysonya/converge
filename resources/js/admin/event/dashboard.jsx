import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { currency } from "@/helpers/application"

const styles = theme => ({
	gridItem: {
		maxWidth: "320px"
	},
	statsBox: {
		padding: "20px",
		textAlign: "center",
		boxShadow: theme.shadows[1]
	},
	statsValue: {
		fontSize: "32px",
		color: theme.palette.primary.main
	},
	statsLabel: {
		fontSize: "14px",
		color: theme.palette.grey[600]
	}
})

const InternalDashboard = ({ classes, event }) => {
	return (
		<div>
			<Grid container spacing={16}>
				<Grid item xs={12} md={4} className={classes.gridItem}>
					<Paper className={classes.statsBox}>
						<Typography className={classes.statsValue} variant="subtitle2">
							{event.attendants_count}
						</Typography>
						<Typography className={classes.statsLabel} variant="body1">
							Participants
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4} className={classes.gridItem}>
					<Paper className={classes.statsBox}>
						<Typography className={classes.statsValue} variant="subtitle2">
							{currency(event.total_revenue)}
						</Typography>
						<Typography className={classes.statsLabel} variant="body1">
							Revenue
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4} className={classes.gridItem}>
					<Paper className={classes.statsBox}>
						<Typography className={classes.statsValue} variant="subtitle2">
							{currency(event.total_donation)}
						</Typography>
						<Typography className={classes.statsLabel} variant="body1">
							Donations
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}

InternalDashboard.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		event: state.dashboard.event
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalDashboard)

export default withStyles(styles)(Dashboard)
