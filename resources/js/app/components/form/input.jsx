import CheckIcon from "@material-ui/icons/Check"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"
import { getIn } from "formik"
import React, { Component } from "react"
import PropTypes from "prop-types"

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

// Don't pass formProps if validation not needed
class Input extends Component {
	constructor(props) {
		super(props)

		this.state = {
			error: this.getError(),
			valid: this.getValid()
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.formProps) {
			const prevError = prevState.error
			const error = this.getError()
			if (prevError !== error) {
				this.setState({ error: error })
			}
			const prevValid = prevState.valid
			const valid = this.getValid()
			if (prevValid !== valid) {
				this.setState({ valid: valid })
			}
		}
	}

	getError() {
		if (this.props.formProps) {
			const error = getIn(this.props.formProps.errors, this.props.name)
			const touch = getIn(this.props.formProps.touched, this.props.name)
			// console.log("NAME: ", this.props.name, "TOUCH: ", touch, " ERR: ", error)
			return touch && error ? error : false
		}
		return false
	}

	getValid() {
		if (this.props.formProps) {
			const error = getIn(this.props.formProps.errors, this.props.name)
			const touch = getIn(this.props.formProps.touched, this.props.name)
			return !!touch && typeof error === "undefined" && !!!error
		}
		return false
	}

	render() {
		const {
			autoComplete,
			classes,
			formProps,
			label,
			name,
			value,
			width,
			...props
		} = this.props
		const { error, valid } = this.state
		return (
			<TextField
				label={label}
				variant={isMobile(width) ? "standard" : "outlined"}
				InputLabelProps={{
					className: classes.inputLabel
				}}
				InputProps={{
					className: isMobile(width) ? "" : classes.input,
					endAdornment: valid ? (
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

Input.propTypes = {}

export default withStyles(styles)(withWidth()(Input))
