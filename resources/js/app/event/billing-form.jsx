import Button from "@material-ui/core/Button"
import LockIcon from "@material-ui/icons/Lock"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import { Field, getIn } from "formik"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { Input, inputError } from "@/app/components/form/index"
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
	background-color: ${props => props.theme.grey[800]};
	border-radius: 50%;
`

const InternalBillingForm = ({ classes, errors, touched, values, width }) => {
	return (
		<div>
			<Grid container spacing={40} justify="space-between">
				<Grid item xs={12} md={7} className={isMobile(width) ? "pb-rm" : ""}>
					<PaymentContainer>
						<SectionTitle>
							<Step>1</Step> Billing Information
						</SectionTitle>
						<Field
							name="payment.address"
							render={({ field, form }) => (
								<Input
									label="Street Address"
									error={inputError(form, "payment.address")}
									touched={getIn(form.touched, "payment.address")}
									autoComplete="billing street-address"
									{...field}
								/>
							)}
						/>
						<Grid container spacing={8} style={{ marginBottom: "10px" }}>
							<Grid item xs={6}>
								<Field
									name="payment.city"
									render={({ field, form }) => (
										<Input
											label="City"
											error={inputError(form, "payment.city")}
											touched={getIn(form.touched, "payment.city")}
											autoComplete="billing address-level2"
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="payment.state"
									render={({ field, form }) => (
										<Input
											label="State/Province"
											error={inputError(form, "payment.state")}
											touched={getIn(form.touched, "payment.state")}
											autoComplete="billing address-level1"
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="payment.zip"
									render={({ field, form }) => (
										<Input
											label="Zip/Postal Code"
											error={inputError(form, "payment.zip")}
											touched={getIn(form.touched, "payment.zip")}
											autoComplete="billing postal-code"
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="payment.country"
									render={({ field, form }) => (
										<Input
											select
											label="Country"
											error={inputError(form, "payment.country")}
											autoComplete="billing country"
											{...field}
										>
											<MenuItem value="" />
											<MenuItem value="US">United States</MenuItem>
											<MenuItem value="CA">Canada</MenuItem>
										</Input>
									)}
								/>
							</Grid>
						</Grid>

						<SectionTitle>
							<Step>2</Step> Card Details
						</SectionTitle>
						<Field
							name="payment.cardName"
							render={({ field, form }) => (
								<Input
									label="Cardholder Name"
									error={inputError(form, "payment.cardName")}
									touched={getIn(form.touched, "payment.cardName")}
									autoComplete="cc-name"
									{...field}
								/>
							)}
						/>
						<Field
							name="payment.cardNum"
							render={({ field, form }) => (
								<Input
									label="Card Number"
									error={inputError(form, "payment.cardNum")}
									touched={getIn(form.touched, "payment.cardNum")}
									autoComplete="cc-number"
									maxLength="16"
									{...field}
								/>
							)}
						/>

						<Grid container spacing={8} style={{ marginBottom: "10px" }}>
							<Grid item xs={6}>
								<Field
									name="payment.expiryMonth"
									render={({ field, form }) => (
										<Input
											label="Month"
											error={inputError(form, "payment.expiryMonth")}
											touched={getIn(form.touched, "payment.expiryMonth")}
											autoComplete="cc-exp-month"
											maxLength="2"
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="payment.expiryYear"
									render={({ field, form }) => (
										<Input
											label="Year"
											error={inputError(form, "payment.expiryYear")}
											touched={getIn(form.touched, "payment.expiryYear")}
											autoComplete="cc-exp-month"
											maxLength="2"
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="payment.cvv"
									render={({ field, form }) => (
										<Input
											label="Security code"
											error={inputError(form, "payment.cvv")}
											touched={getIn(form.touched, "payment.cvv")}
											autoComplete="cc-exp-month"
											maxLength="3"
											{...field}
										/>
									)}
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
