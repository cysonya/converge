import CheckIcon from "@material-ui/icons/Check"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import React, { Component } from "react"

import { isMobile } from "@/helpers/application"

const styles = theme => ({
	inputLabel: {
		fontSize: "14px",
		[theme.breakpoints.up("md")]: {
			fontSize: "16px"
		}
	},
	input: {
		borderRadius: "4px",
		backgroundColor: "#fff"
	}
})

class Input extends Component {
	render() {
		const {
			autoComplete,
			classes,
			error,
			label,
			name,
			touched,
			value,
			width,
			...props
		} = this.props
		return (
			<TextField
				label={label}
				variant={isMobile(width) ? "standard" : "outlined"}
				InputLabelProps={{
					className: classes.inputLabel
				}}
				InputProps={{
					className: isMobile(width) ? "" : classes.input,
					endAdornment:
						touched && !error ? (
							<InputAdornment position="end">
								<CheckIcon color="primary" />
							</InputAdornment>
						) : null
				}}
				inputProps={{ autoComplete: autoComplete }}
				margin="dense"
				fullWidth
				name={name}
				value={value}
				error={!!error}
				helperText={error}
				{...props}
			>
				{this.props.children}
			</TextField>
		)
	}
}

export default withStyles(styles)(withWidth()(Input))
