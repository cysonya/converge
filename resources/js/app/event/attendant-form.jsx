import AddCircleIcon from "@material-ui/icons/AddCircle"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getRandomColor, isMobile } from "@/helpers/application"
import { Divider, styles } from "./components"

const InternalAttendantForm = ({ classes, width }) => {
	return (
		<div>
			<Card className={classes.card} style={{ borderColor: getRandomColor() }}>
				<Typography variant="h6" className={classes.cardName}>
					Your Information
				</Typography>
				<Grid container spacing={8}>
					<Grid item xs={6}>
						<TextField
							label="First name"
							variant={isMobile(width) ? "standard" : "outlined"}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: isMobile(width) ? "" : classes.input
							}}
							margin="dense"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Last name"
							variant={isMobile(width) ? "standard" : "outlined"}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: isMobile(width) ? "" : classes.input
							}}
							margin="dense"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Your Email"
							variant={isMobile(width) ? "standard" : "outlined"}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: isMobile(width) ? "" : classes.input
							}}
							margin="dense"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Your age group"
							variant={isMobile(width) ? "standard" : "outlined"}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: isMobile(width) ? "" : classes.input
							}}
							margin="dense"
							fullWidth
							value="1"
							select
						>
							<option value="1">Adult 18+</option>
							<option value="2">Teen (13 - 17)</option>
						</TextField>
					</Grid>
				</Grid>
			</Card>

			<Button variant="outlined" color="primary" size="small">
				<AddCircleIcon className="pr-5" fontSize="small">
					Add
				</AddCircleIcon>{" "}
				ADD MEMBER
			</Button>
		</div>
	)
}

InternalAttendantForm.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const AttendantForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalAttendantForm)))

export default AttendantForm
