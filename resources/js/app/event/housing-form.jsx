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
// import { media } from "@/styles/utils"
import { Divider, styles } from "./components"

// const Packages = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	flex-wrap: wrap;
// `
// const Packagewrapper = styled.div`
// 	padding: 4px;
// 	flex-basis: 100%;
// 	${media.md`
// 		flex-basis: 33%;
// 	`}
// `
// const Package = styled.div`
// 	position: relative;
// 	display: flex;
// 	padding: 8px;
// 	background-color: ${props => props.theme.grey[100]};
// 	border: 2px solid
// 		${props => (props.selected ? props.theme.primary.light : "transparent")};
// 	border-radius: 4px;
// `
// const Check = styled(CheckCircleIcon)`
// 	position: absolute;
// 	top: -11px;
// 	right: -10px;
// 	color: ${props => props.theme.primary.main};
// 	background-color: white;
// 	border-radius: 50%;
// `
const InternalHousingForm = ({
	errors,
	classes,
	packages,
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
							{index === 0 ? "Your Details" : `Attendant #${index + 1} Details`}
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
														{p.title} - ${p.price}
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
						{/* TODO: delete if not going to use */}
						{false && (
							<Packages>
								<Packagewrapper>
									<Package selected>
										{true && <Check />}
										<Grid item xs>
											<Typography
												variant="subtitle2"
												className={classes.lineHeight}
											>
												Bowler Hall
											</Typography>
										</Grid>
										<Grid item>
											<Typography variant="subtitle1" color="primary">
												$19.00
											</Typography>
										</Grid>
									</Package>
								</Packagewrapper>

								<Packagewrapper>
									<Package>
										<Grid item xs>
											<Typography variant="subtitle2">East Hall</Typography>
										</Grid>
										<Grid item>
											<Typography
												variant="subtitle1"
												className={classes.lineHeight}
												color="primary"
											>
												$19.00
											</Typography>
										</Grid>
									</Package>
								</Packagewrapper>
							</Packages>
						)}
					</Card>
				))
			}}
		/>
	)
}

InternalHousingForm.propTypes = {}

// Only show Townhouse option if attandants contain 'Toddler' age group
const getPackages = (state, ownProps) => {
	let pkgs = state.event.packages
	// Get group id of Toddler
	let toddlerId = state.event.groups.find(g =>
		g.description.includes("Toddlers")
	).id

	if (
		typeof ownProps.values.registrants.find(r => r.group === toddlerId) ===
		"undefined"
	) {
		// Remove 'Townhouse' from package options
		return pkgs.filter(p => p.title !== "Townhouse")
	} else {
		// return all package options if attendant contains Toddler
		return pkgs
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		packages: getPackages(state, ownProps)
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
