import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormHelperText from "@material-ui/core/FormHelperText"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import { Field } from "formik"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { isMobile } from "@/helpers/application"
import { media } from "@/styles/utils"

import { TotalAmount } from "./components"

const styles = theme => ({
	summaryWrapper: {
		marginBottom: "20px",
		padding: "0 10px 10px"
	},
	alignRight: {
		paddingRight: "10px !important",
		textAlign: "right"
	},
	alignLeft: {
		paddingLeft: "10px"
	},
	donateInput: {
		width: "130px"
	}
})
const TableWrapper = styled.div`
	margin-bottom: 10px;
	width: 100%;
	overflow-x: auto;
`
const TotalContainer = styled.div`
	padding: 10px;
	background-color: ${props => props.theme.grey[200]};
	border-radius: 4px;
	${media.md`
		width: 45%;
		margin-left: auto;
	`}
`
const ButtonGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const DonateButton = styled(Button)`
	&& {
		margin-right: 6px;
		margin-bottom: 6px;
	}
`
const InternalReviewOrder = ({
	classes,
	donationSelect,
	errors,
	groups,
	orderTotal,
	packages,
	setFieldValue,
	touched,
	values,
	width
}) => {
	return (
		<div>
			<Typography variant="h6" gutterBottom>
				Summary
			</Typography>
			<Paper className={classes.summaryWrapper}>
				<TableWrapper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.alignLeft}>Name</TableCell>
								<TableCell>Group</TableCell>
								<TableCell>Housing</TableCell>
								<TableCell className={classes.alignRight}>Amount</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{values.registrants.map((registrant, index) => {
								let group = groups.find(g => g.id === registrant.group)
								let pkg = packages.find(g => g.id === registrant.package)
								return (
									<TableRow key={index}>
										<TableCell className={classes.alignLeft}>
											<strong>
												{registrant.first_name} {registrant.last_name}
											</strong>
										</TableCell>
										<TableCell>{group.description}</TableCell>
										<TableCell>{pkg.title}</TableCell>
										<TableCell className={classes.alignRight}>
											${Math.round(pkg.price)}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableWrapper>

				<TotalContainer>
					<TotalAmount>
						<strong>Total</strong>
						<strong>${orderTotal} USD</strong>
					</TotalAmount>
				</TotalContainer>
			</Paper>

			<Grid
				container
				spacing={16}
				alignItems="flex-end"
				justify="space-between"
			>
				<Grid
					item
					xs={12}
					md={6}
					style={{ marginBottom: isMobile(width) ? "10px" : "" }}
				>
					<Typography style={{ lineHeight: "1.3", marginBottom: "10px" }}>
						Donate to help people come who otherwise cannot afford it:
					</Typography>

					<ButtonGroup>
						{donationSelect.map((donation, i) =>
							donation === values.donation ? (
								<DonateButton
									key={i}
									variant="contained"
									size="small"
									color="secondary"
								>
									${donation}
								</DonateButton>
							) : (
								<DonateButton
									key={i}
									variant="outlined"
									size="small"
									onClick={() => setFieldValue("donation", donation)}
								>
									${donation}
								</DonateButton>
							)
						)}

						<FormControl className={classes.donateInput}>
							<Field
								name="donation"
								render={({ field }) => (
									<Input
										id="adornment-amount"
										placeholder="Other"
										error={errors.donation}
										helperText={errors.donation}
										{...field}
										startAdornment={
											<InputAdornment position="start">$</InputAdornment>
										}
									/>
								)}
							/>
							{!!errors.donation && (
								<FormHelperText error={errors.donation}>
									{errors.donation}
								</FormHelperText>
							)}
						</FormControl>
					</ButtonGroup>
				</Grid>
			</Grid>
		</div>
	)
}

InternalReviewOrder.propTypes = {}

const getTotal = (state, ownProps) => {
	return ownProps.values.registrants.reduce((acc, registrant) => {
		let pkg = state.event.packages.find(p => p.id === registrant.package)
		return acc + Math.round(pkg.price)
	}, 0)
}

const mapStateToProps = (state, ownProps) => {
	return {
		groups: state.event.groups,
		packages: state.event.packages,
		orderTotal: getTotal(state, ownProps),
		donationSelect: [5, 10, 20, 50, 100]
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const ReviewOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalReviewOrder)))

export default ReviewOrder
