import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { removeOrderError } from "@/app-store/actions"
import { isMobile } from "@/helpers/application"

const styles = theme => ({
	error: {
		color: "white",
		backgroundColor: theme.palette.error.dark,
		[theme.breakpoints.up("md")]: {
			marginLeft: "20px",
			marginRight: "20px",
			maxWidth: "none",
			boxShadow: theme.shadows[2]
		}
	},
	errorClose: {
		padding: 0
	}
})

const InternalErrorAlert = ({ classes, closeError, error, width }) => {
	let errorContent = (
		<SnackbarContent
			className={classes.error}
			aria-describedby="error-message"
			message={error}
			action={[
				<IconButton
					className={classes.errorClose}
					key="close"
					aria-label="Close"
					color="inherit"
					onClick={() => closeError()}
				>
					<CloseIcon />
				</IconButton>
			]}
		/>
	)

	if (isMobile(width)) {
		return (
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left"
				}}
				open
				onClose={() => closeError()}
			>
				{errorContent}
			</Snackbar>
		)
	} else {
		return errorContent
	}
}

InternalErrorAlert.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		error: state.order.error
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		closeError: () => {
			dispatch(removeOrderError())
		}
	}
}

const ErrorAlert = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalErrorAlert)

export default withStyles(styles)(withWidth()(ErrorAlert))
