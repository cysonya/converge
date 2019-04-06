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

import { Input, inputError } from "@/app/components/form/index"
import { filterPackages } from "@/app-store/actions"
import { currency, isMobile } from "@/helpers/application"
import { Divider, styles } from "./components"

const InternalHousingForm = ({
	classes,
	errors,
	packages,
	setChoice,
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
												className={classes.pkgSelect}
												select
												label="Housing option"
												error={inputError(
													form,
													`registrants[${index}].package`
												)}
												onClick={e => setChoice(e, index)}
												{...field}
											>
												<MenuItem value="" />
												{packages.map(
													(p, i) =>
														(p.remain > 0 || registrant.package === p.id) && (
															<MenuItem key={i} value={p.id}>
																{p.title} -&nbsp;
																{currency(
																	p.groups.find(g => g.id === registrant.group)
																		.price
																)}
																&nbsp;
																{p.remain < 6 && (
																	<span className="text-alert">
																		{`(${p.remain} spots left)`}
																	</span>
																)}
															</MenuItem>
														)
												)}
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

	// Only show Townhouse option if attandants contain at least two children
	let childrenIds = []
	state.event.groups.map(g => {
		if (!g.description.includes("Adults")) {
			childrenIds.push(g.id)
		}
	})

	if (
		ownProps.values.registrants.filter(r => childrenIds.includes(r.group))
			.length >= 2
	) {
		// return all package options if attendant contains at least 2 children
		return pkgs
	} else {
		// Remove 'Townhouse' from package options
		return pkgs.filter(p => p.title !== "Townhouse")
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		packages: getPackages(state, ownProps)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return { dispatch }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { values } = ownProps
	const { dispatch } = dispatchProps
	return {
		...ownProps,
		...stateProps,
		...dispatchProps,
		setChoice: (e, regIndex) => {
			let value = e.target.value
			if (!!value) {
				let registrants = values.registrants.map((reg, i) => {
					if (i === regIndex) {
						return Object.assign({}, reg, { package: value })
					}
					return reg
				})
				dispatch(filterPackages(registrants))
			}
		}
	}
}

const HousingForm = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(withStyles(styles)(withWidth()(InternalHousingForm)))

export default HousingForm
