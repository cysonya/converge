import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles"
import withWidth from '@material-ui/core/withWidth'

import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { Divider, styles } from "./components"

const InternalAttendantForm = ({ classes, width}) => {
	const isMobile = /xs|sm/.test(width)

  return (
    <div>
	    <Divider text="Your information" />
	    <Grid container spacing={8} style={{marginBottom: "20px"}}>
	    	<Grid item xs={6}>
					<TextField
						label="First name"
						variant={isMobile ? "standard" : "filled"}
						InputLabelProps={{
							className: classes.inputLabel
						}}
						InputProps={{
						  className: isMobile ? "" : classes.input
						}}
						margin="dense"
						fullWidth
					/>
	    	</Grid>
	    	<Grid item xs={6}>
		    	<TextField
		    		label="Last name"
						variant={isMobile ? "standard" : "filled"}
						InputLabelProps={{
							className: classes.inputLabel
						}}
						InputProps={{
						  className: isMobile ? "" : classes.input
						}}
		    		margin="dense"
		    		fullWidth
		    	/>
	    	</Grid>
	    	<Grid item xs={6}>
					<TextField
						label="Your Email"
						variant={isMobile ? "standard" : "filled"}
						InputLabelProps={{
							className: classes.inputLabel
						}}
						InputProps={{
						  className: isMobile ? "" : classes.input
						}}
						margin="dense"
						fullWidth
					/>
	    	</Grid>
	    	<Grid item xs={6}>
		    	<TextField
		    		label="Your age group"
		    		variant={isMobile ? "standard" : "filled"}
		    		InputLabelProps={{
							className: classes.inputLabel
						}}
		    		InputProps={{
		    		  className: isMobile ? "" : classes.input
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


	    <Button variant="outlined" color="primary" size="small">
	    	<AddCircleIcon className="pr-5" fontSize="small">Add</AddCircleIcon> ADD MEMBER
	    </Button>
    </div>
  )
}

InternalAttendantForm.propTypes = {
}


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