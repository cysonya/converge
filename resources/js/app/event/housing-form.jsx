import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import { Field, FieldArray, getIn } from "formik"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { isMobile } from "@/helpers/application"
import { Input, inputError } from "@/app/components/form/index"
import { Divider, styles } from "./components"

const InternalHousingForm = ({
	errors,
	classes,
	packages,
	selectedPackages,
	touched,
	width,
	values
}) => {
	return (
		<FieldArray
			name="registrants"
			render={arrayHelpers => {
				return values.registrants.map((registrant, index) => (
					<Card
						key={index}
						className={classes.card}
						style={{ borderColor: registrant.color }}
					>
						<Typography variant="h6" className={classes.cardName}>
							{index === 0
								? "Your Details"
								: `${registrant.first_name} ${registrant.last_name} Details`}
						</Typography>

						<Grid container spacing={8} style={{ marginBottom: "10px" }}>
							<Grid item xs={12} md={6}>
								<Field
									name={`registrants[${index}].package`}
									render={({ field, form }) => {
										return (
											<Input
												select
												label="Housing option"
												error={inputError(
													form,
													`registrants[${index}].package`
												)}
												{...field}
											>
												<MenuItem value="" />
												{packages.map((p, i) => (
													<MenuItem key={i} value={p.id}>
														{p.title} - ${p.price}&nbsp;
														{p.quantity_remaining < 6 && (
															<span className="text-alert">
																(
																{p.quantity_remaining -
																	(selectedPackages[p.id]
																		? selectedPackages[p.id]
																		: 0)}{" "}
																spots left)
															</span>
														)}
													</MenuItem>
												))}
											</Input>
										)
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6} />
							<Grid item xs={12} md={6}>
								<Field
									name={`registrants[${index}].roommates`}
									render={({ field, form }) => {
										return <Input label="Roommate preference" {...field} />
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Field
									name={`registrants[${index}].dietary`}
									render={({ field, form }) => {
										return <Input label="Dietary restrictions" {...field} />
									}}
								/>
							</Grid>
						</Grid>
					</Card>
				))
			}}
		/>
	)
}

InternalHousingForm.propTypes = {}

const getPackages = (state, ownProps) => {
	let pkgs = state.event.packages

	// Only show Townhouse option if attandants contain 'Toddler' age group
	// Get group id of Toddler
	let toddlerId = state.event.groups.find(g =>
		g.description.includes("Toddler")
	).id

	if (ownProps.values.registrants.filter(r => r.group === 5).length >= 2) {
		// return all package options if attendant contains at least 2 Toddler
		return pkgs
	} else {
		// Remove 'Townhouse' from package options
		return pkgs.filter(p => p.title !== "Townhouse")
	}
}

// Get quantity of selected packages
const getSelected = (state, ownProps) => {
	let pkgs = state.event.packages
	let selections = {}

	// Map package id to selected quantity
	// ex: {2: 1, 3: 1}
	ownProps.values.registrants.forEach(reg => {
		console.log("REG: ", reg)

		if (selections.hasOwnProperty(reg.package)) {
			selections[reg.package] += 1
		} else {
			let pkg = pkgs.find(p => p.id === reg.package)
			selections[reg.package] = 1
		}
	})
	console.log("SELECTIONS ARE: ", selections)
	return selections
}
const mapStateToProps = (state, ownProps) => {
	return {
		packages: getPackages(state, ownProps),
		selectedPackages: getSelected(state, ownProps)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const HousingForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalHousingForm)))

export default HousingForm
