import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/core/styles"
import withWidth from '@material-ui/core/withWidth'

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Divider, styles } from "./components"
const InternalHousingForm = ({ classes, width}) => {
	const isMobile = /xs|sm/.test(width)

  return (
    <div>
    	<Divider text="Your information" />

    	<Grid container spacing={8} style={{marginBottom: "20px"}}>
	    	<Grid item xs={12} md={6}>
					<TextField
						label="Roommate preference"
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
	    	<Grid item xs={12} md={6}>
		    	<TextField
		    		label="Dietary restrictions"
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
    	</Grid>

    	<Grid container spacing={8} style={{marginBottom: "20px"}}>
    	</Grid>
    </div>
  )
}

InternalHousingForm.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const HousingForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalHousingForm)))

export default HousingForm