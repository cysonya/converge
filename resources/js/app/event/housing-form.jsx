import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import FileCopyOutlined from "@material-ui/icons/FileCopyOutlined"
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
	copyPackage,
	formProps,
	packages,
	setChoice,
	width
}) => {
	return (
		<FieldArray
			name="registrants"
			render={arrayHelpers => {
				return formProps.values.registrants.map((registrant, index) => (
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

						<Grid
							alignItems="center"
							container
							spacing={8}
							style={{ marginBottom: "10px" }}
						>
							<Grid item xs={12} md={6}>
								<Field
									name={`registrants[${index}].package`}
									render={({ field }) => {
										return (
											<Input
												select
												formprops={formProps}
												className={classes.pkgSelect}
												label="Housing option"
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
							<Grid item xs={12} md={6}>
								{formProps.values.registrants.length > 1 &&
									index === 0 &&
									!!formProps.values.registrants[0].package && (
										<Button
											color="secondary"
											onClick={e => copyPackage(e)}
											size="small"
											variant="contained"
										>
											<FileCopyOutlined className="pr-5" fontSize="small" />
											Copy housing option
										</Button>
									)}
							</Grid>
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
		ownProps.formProps.values.registrants.filter(r =>
			childrenIds.includes(r.group)
		).length >= 2
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
	const { formProps } = ownProps
	return {
		copyPackage: e => {
			e.preventDefault()
			const firstRegistrant = formProps.values.registrants[0]

			// Copy first registrant package to all other participants
			formProps.values.registrants.slice(1).forEach((reg, index) => {
				formProps.setFieldValue(
					`registrants[${index + 1}].package`,
					firstRegistrant.package
				)
			})
		},
		setChoice: (e, regIndex) => {
			let value = e.target.value
			if (!!value) {
				// Copy registrants object with selected package
				let registrants = ownProps.formProps.values.registrants.map(
					(reg, i) => {
						if (i === regIndex) {
							return Object.assign({}, reg, { package: value })
						}
						return reg
					}
				)
				// Set remaining package qty
				dispatch(filterPackages(registrants))
			}
		}
	}
}

const HousingForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalHousingForm)))

export default HousingForm
