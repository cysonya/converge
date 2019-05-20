import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Formik, Form, Field } from "formik"

import { Input } from "@/app/components/form/index"
import { updatePackage } from "@/admin-store/actions"

const InternalAttendantsCreate = ({ initialValues }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, { setSubmitting }) => {
				console.log("SUBMIT")
			}}
			render={formProps => (
				<Form>
					<h1>WIP...</h1>
					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							<Field
								name="title"
								render={({ field, form }) => <Input label="" />}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Field
								name="title"
								render={({ field, form }) => <Input label="" />}
							/>
						</Grid>
					</Grid>
				</Form>
			)}
		/>
	)
}

InternalAttendantsCreate.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { first_name: "" }
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const AttendantsCreate = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalAttendantsCreate)

export default AttendantsCreate
