import AddCircleIcon from "@material-ui/icons/AddCircle"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import { Field } from "formik"
import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getRandomColor, isMobile } from "@/helpers/application"
import Input from "@/app/components/form/input"
import { Divider, styles } from "./components"

const InternalAttendantForm = ({
	errors,
	classes,
	groups,
	touched,
	values,
	width
}) => {
	return (
		<div>
			<Card className={classes.card} style={{ borderColor: getRandomColor() }}>
				<Typography variant="h6" className={classes.cardName}>
					Your Information
				</Typography>
				<Grid container spacing={8}>
					<Grid item xs={6}>
						<Field
							name="customer_first_name"
							render={({ field }) => (
								<Input
									label="First name"
									error={
										touched.customer_first_name
											? errors.customer_first_name
											: false
									}
									valid={
										!!(
											touched.customer_first_name && !errors.customer_first_name
										)
											? 1
											: 0
									}
									{...field}
									autoFocus
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Field
							name="customer_last_name"
							render={({ field }) => (
								<Input
									label="Last name"
									error={
										touched.customer_last_name
											? errors.customer_last_name
											: false
									}
									valid={
										!!(touched.customer_last_name && !errors.customer_last_name)
											? 1
											: 0
									}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Field
							name="customer_email"
							render={({ field }) => (
								<Input
									label="Email"
									error={touched.customer_email ? errors.customer_email : false}
									valid={
										!!(touched.customer_email && !errors.customer_email) ? 1 : 0
									}
									{...field}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Field
							name="registrants[0][group]"
							render={({ field }) => {
								return (
									<Input
										select
										label="Age Group"
										error={
											touched.registrants &&
											touched.registrants[0]["group"] &&
											errors.registrants &&
											errors.registrants[0]["group"]
												? errors.registrants[0]["group"]
												: false
										}
										{...field}
									>
										<MenuItem value="" />
										{groups.map((group, i) => (
											<MenuItem key={i} value={group.id}>
												{group.description}
											</MenuItem>
										))}
									</Input>
								)
							}}
						/>
					</Grid>
				</Grid>
			</Card>

			<Button
				variant="outlined"
				color="primary"
				size="small"
				style={{ marginBottom: "20px" }}
			>
				<AddCircleIcon className="pr-5" fontSize="small">
					Add
				</AddCircleIcon>{" "}
				ADD ATTENDANT
			</Button>
		</div>
	)
}

InternalAttendantForm.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		groups: state.event.groups
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const AttendantForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalAttendantForm)))

export default AttendantForm
