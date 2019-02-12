import AddCircleIcon from "@material-ui/icons/AddCircle"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CloseIcon from "@material-ui/icons/Close"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import { Field, FieldArray, getIn } from "formik"
import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import styled from "styled-components"

import { getRandomColor } from "@/helpers/application"
import { Input, inputError } from "@/app/components/form/index"
import { Divide, styles } from "./components"

const RemoveIcon = styled(CloseIcon)`
	&& {
		color: ${props => props.theme.grey[500]};
		font-size: 24px;
		cursor: pointer;
	}
`

const InternalAttendantForm = ({
	errors,
	classes,
	copyEmail,
	groups,
	touched,
	values
}) => {
	return (
		<FieldArray
			name="registrants"
			render={arrayHelpers => {
				return (
					<div>
						{values.registrants.map((registrant, index) => (
							<Card
								key={index}
								className={classes.card}
								style={{ borderColor: registrant.color }}
							>
								<Grid container justify="space-between">
									<Typography variant="h6" className={classes.cardName}>
										{index === 0
											? "Your Details"
											: `Participant #${index + 1} Details`}
									</Typography>
									{index !== 0 && (
										<IconButton
											aria-label="Remove"
											className="p-rm"
											onClick={() => arrayHelpers.remove(index)}
										>
											<RemoveIcon />
										</IconButton>
									)}
								</Grid>

								<Grid container spacing={8}>
									<Grid item xs={6}>
										<Field
											name={`registrants[${index}].first_name`}
											render={({ field, form }) => {
												return (
													<Input
														label="First name"
														error={inputError(
															form,
															`registrants[${index}].first_name`
														)}
														touched={getIn(
															form.touched,
															`registrants[${index}].first_name`
														)}
														autoComplete="given-name"
														{...field}
													/>
												)
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<Field
											name={`registrants[${index}].last_name`}
											render={({ field, form }) => {
												return (
													<Input
														label="Last name"
														error={inputError(
															form,
															`registrants[${index}].last_name`
														)}
														touched={getIn(
															form.touched,
															`registrants[${index}].last_name`
														)}
														autoComplete="family-name"
														{...field}
													/>
												)
											}}
										/>
									</Grid>
									{index === 0 && (
										<Grid item xs={6}>
											<Field
												name={`customer_email`}
												render={({ field, form }) => {
													return (
														<Input
															label="Email"
															type="email"
															error={inputError(form, `customer_email`)}
															touched={getIn(form.touched, `customer_email`)}
															autoComplete="email"
															{...field}
														/>
													)
												}}
											/>
										</Grid>
									)}
									<Grid item xs={6}>
										<Field
											name={`registrants[${index}].group`}
											render={({ field, form }) => {
												return (
													<Input
														select
														label="Age Group"
														error={inputError(
															form,
															`registrants[${index}].group`
														)}
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
						))}
						<Button
							variant="contained"
							color="secondary"
							size="small"
							style={{ marginBottom: "20px" }}
							onClick={() =>
								arrayHelpers.push({
									color: getRandomColor(),
									first_name: "",
									last_name: "",
									email: "",
									group: "",
									package: "",
									roommates: "",
									dietary: ""
								})
							}
						>
							<AddCircleIcon className="pr-5" fontSize="small">
								Add
							</AddCircleIcon>{" "}
							ADD PARTICIPANT
						</Button>
					</div>
				)
			}}
		/>
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
)(withStyles(styles)(InternalAttendantForm))

export default AttendantForm
