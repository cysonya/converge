import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import styled from "styled-components"

const styles = theme => ({
	statsValue: {
		fontSize: "32px",
		color: theme.palette.primary.main
	},
	statsLabel: {
		fontSize: "14px",
		color: theme.palette.grey[600]
	}
})

const StatsBox = styled.div`
	padding: 20px;
	text-align: center;
	background-color: #fff;
	border: 1px solid ${props => props.theme.grey[300]};
`
const StatsValue = styled.h3`
	margin: 0 0 5px;
`
const InternalDashboard = ({ classes, event }) => {
	if (!event) return null

	return (
		<div>
			<Grid container spacing={16}>
				<Grid item xs={12} md={4}>
					<StatsBox>
						<Typography className={classes.statsValue} variant="subtitle2">
							{event.attendants_count}
						</Typography>
						<Typography className={classes.statsLabel} variant="body1">
							Participants
						</Typography>
					</StatsBox>
				</Grid>
				<Grid item xs={12} md={4}>
					<StatsBox>
						<Typography className={classes.statsValue} variant="subtitle2">
							${event.total_revenue}
						</Typography>
						<Typography className={classes.statsLabel} variant="body1">
							Revenue
						</Typography>
					</StatsBox>
				</Grid>
				<Grid item xs={12} md={4}>
					<StatsBox>
						<Typography className={classes.statsValue} variant="subtitle2">
							${event.total_donation}
						</Typography>
						<Typography className={classes.statsLabel} variant="body1">
							Donations
						</Typography>
					</StatsBox>
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
