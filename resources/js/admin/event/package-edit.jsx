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

import { Input, inputError } from "@/app/components/form/index"

const InternalPackageEdit = ({ pkg }) => {
	console.log("PACKAGE: ", pkg)
	return (
		<Formik
			initialValues={{
				title: pkg.title,
				quantity_available: pkg.quantity_available || "",
				groups: pkg.groups.map(g => ({
					id: g.id,
					price: parseFloat(g.price).toFixed(0)
				}))
			}}
			onSubmit={(values, { setSubmitting }) => {
				console.log("SUBMIT: ", values)
			}}
			render={({ errors, touched, values }) => (
				<Form>
					<Grid className="mb-20" container spacing={16}>
						<Grid item xs={12} md={6}>
							<Field
								name="title"
								render={({ field, form }) => (
									<Input
										label="Housing Name"
										error={inputError(form, "title")}
										touched={touched.title}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Field
								name="quantity_available"
								render={({ field, form }) => (
									<Input
										placeholder="leave blank for unlimited"
										label="Space available"
										error={inputError(form, "quantity_available")}
										touched={touched.quantity_available}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle2">Group Pricing</Typography>
						</Grid>
						{pkg.groups.map((group, i) => (
							<Grid key={i} item xs={6}>
								<Field
									name={`groups[${i}].price`}
									render={({ field, form }) => (
										<TextField
											label={group.description}
											placeholder="Price"
											fullWidth
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">$</InputAdornment>
												),
												endAdornment: (
													<InputAdornment position="end">.00</InputAdornment>
												)
											}}
											InputLabelProps={{
												shrink: true
											}}
											{...field}
										/>
									)}
								/>
							</Grid>
						))}
					</Grid>
					<div className="text-right">
						<Button type="submit" variant="contained" color="primary">
							Save
						</Button>
					</div>
				</Form>
			)}
		/>
	)
}

InternalPackageEdit.propTypes = {}

const getPackage = (state, ownProps) => {
	console.log("PKG: ", ownProps.pkgId)
	return state.dashboard.packages.find(p => p.id == ownProps.pkgId)
}
const mapStateToProps = (state, ownProps) => {
	return {
		pkg: getPackage(state, ownProps)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const PackageEdit = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalPackageEdit)

export default PackageEdit
