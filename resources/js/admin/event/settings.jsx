import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import EditIcon from "@material-ui/icons/Edit"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { Input, inputError } from "@/app/components/form/index"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Formik, Form, Field } from "formik"

import { updateEvent } from "@/admin-store/actions"

const styles = {
	card: {
		maxWidth: "480px"
	},
	pageTitle: {
		display: "flex",
		alignItems: "center",
		marginBottom: "10px"
	}
}

const InternalSettings = ({ classes, event, postUpdate }) => {
	if (!event) return null
	return (
		<div>
			<Typography gutterBottom variant="h6" className={classes.pageTitle}>
				<EditIcon className="mr-5" fontSize="inherit" /> Edit Event Details
			</Typography>
			<Card className={classes.card}>
				<CardContent>
					<Formik
						initialValues={event}
						onSubmit={(values, { setSubmitting }) => {
							postUpdate(values, setSubmitting)
						}}
						render={({ errors, touched, values }) => (
							<Grid container spacing={16} component={Form}>
								<Grid item xs={12}>
									<Field
										name="title"
										render={({ field, form }) => (
											<Input label="Event Title" {...field} />
										)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Field
										name="start_date"
										render={({ field, form }) => (
											<Input type="date" label="Start Date" {...field} />
										)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Field
										name="end_date"
										render={({ field, form }) => (
											<Input type="date" label="End Date" {...field} />
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name="social_share_text"
										render={({ field, form }) => {
											field.value = event.social_share_text ? field.value : ""
											return (
												<Input
													label="Social medial share text"
													{...field}
													rows="2"
													multiline
												/>
											)
										}}
									/>
								</Grid>
								<Grid item xs={12} className="text-right">
									<Button type="submit" variant="contained" color="primary">
										Save
									</Button>
								</Grid>
							</Grid>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

InternalSettings.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		event: state.dashboard.event
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		postUpdate: (values, setSubmitting) => {
			dispatch(updateEvent(values, setSubmitting))
		}
	}
}

const Settings = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalSettings)

export default withStyles(styles)(Settings)
