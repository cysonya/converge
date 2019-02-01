import Button from "@material-ui/core/Button"
import LockIcon from "@material-ui/icons/Lock"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import NumberFormat from "react-number-format"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { isMobile } from "@/helpers/application"
import { media } from "@/styles/utils"

import { styles, TotalAmount } from "./components"

const SectionTitle = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	${props =>
		props.divider &&
		`
		padding-bottom: 4px;
		border-bottom: 1px solid ${props.theme.grey[300]};

	`}
`
const PaymentContainer = styled.div`
	padding: 10px;
	background-color: ${props => props.theme.grey[200]};
	border: 1px solid ${props => props.theme.grey[300]};
`
const Step = styled.span`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin-right: 8px;
	height: 24px;
	width: 24px;
	font-size: 14px;
	color: #fff;
	background-color: ${props => props.theme.secondary.light};
	border-radius: 50%;
`

const InternalBillingForm = ({ classes, width }) => {
	const CreditCardFormat = props => {
		const { inputRef, ...other } = props
		return (
			<NumberFormat
				format="#### #### #### ####"
				mask="_"
				getInputRef={inputRef}
				{...other}
			/>
		)
	}
	const CardExpFormat = props => {
		const { inputRef, ...other } = props
		return (
			<NumberFormat
				format="##/##"
				placeholder="MM/YY"
				mask={["M", "M", "Y", "Y"]}
				getInputRef={inputRef}
				{...other}
			/>
		)
	}

	return (
		<div>
			<Grid container spacing={40} justify="space-between">
				<Grid item xs={12} md={7} className={isMobile(width) ? "pb-rm" : ""}>
					<PaymentContainer>
						<SectionTitle>
							<Step>1</Step> Billing Information
						</SectionTitle>
						<TextField
							label="Address"
							variant="outlined"
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: classes.input
							}}
							inputProps={{
								maxLength: 3
							}}
							fullWidth
							margin="dense"
						/>
						<Grid container spacing={8} style={{ marginBottom: "10px" }}>
							<Grid item xs={6}>
								<TextField
									label="City"
									variant="outlined"
									InputLabelProps={{
										className: classes.inputLabel
									}}
									InputProps={{
										className: classes.input
									}}
									inputProps={{
										maxLength: 3
									}}
									fullWidth
									margin="dense"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label="State/Province"
									variant="outlined"
									InputLabelProps={{
										className: classes.inputLabel
									}}
									InputProps={{
										className: classes.input
									}}
									inputProps={{
										maxLength: 3
									}}
									fullWidth
									margin="dense"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label="Country"
									variant="outlined"
									InputLabelProps={{
										className: classes.inputLabel
									}}
									InputProps={{
										className: classes.input
									}}
									inputProps={{
										maxLength: 3
									}}
									fullWidth
									margin="dense"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label="Zip/Postal code"
									variant="outlined"
									InputLabelProps={{
										className: classes.inputLabel
									}}
									InputProps={{
										className: classes.input
									}}
									inputProps={{
										maxLength: 3
									}}
									fullWidth
									margin="dense"
								/>
							</Grid>
						</Grid>

						<SectionTitle>
							<Step>2</Step> Card Details
						</SectionTitle>
						<TextField
							label="Cardholder name"
							variant="outlined"
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: classes.input
							}}
							margin="dense"
							fullWidth
						/>
						<TextField
							label="Card number"
							variant="outlined"
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								inputComponent: CreditCardFormat,
								className: classes.input
							}}
							margin="dense"
							fullWidth
						/>
						<Grid container spacing={8} style={{ marginBottom: "10px" }}>
							<Grid item xs={6}>
								<TextField
									label="Expiry"
									variant="outlined"
									InputLabelProps={{
										className: classes.inputLabel
									}}
									InputProps={{
										inputComponent: CardExpFormat,
										className: classes.input
									}}
									margin="dense"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label="CVV"
									variant="outlined"
									InputLabelProps={{
										className: classes.inputLabel
									}}
									InputProps={{
										className: classes.input
									}}
									inputProps={{
										maxLength: 3
									}}
									margin="dense"
								/>
							</Grid>
						</Grid>
						<Button variant="contained" color="primary" fullWidth>
							PLACE ORDER
						</Button>
					</PaymentContainer>
				</Grid>

				<Grid item xs={12} md={5} style={{ marginBottom: "20px" }}>
					<SectionTitle divider>
						<LockIcon className="pr-5" /> Order Summary
					</SectionTitle>
					<TotalAmount>
						<Typography variant="body2">
							Bowler Hall X <strong>2</strong>
						</Typography>
						<Typography variant="body2">$150</Typography>
					</TotalAmount>
					<TotalAmount>
						<Typography variant="body2">Donation</Typography>
						<Typography variant="body2">$10</Typography>
					</TotalAmount>
					<Divider className={classes.divider} />
					<TotalAmount>
						<strong>Total</strong>
						<strong>$160 USD</strong>
					</TotalAmount>
				</Grid>
			</Grid>
		</div>
	)
}

InternalBillingForm.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const BillingForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalBillingForm)))

export default BillingForm
