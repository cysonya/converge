import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from "@material-ui/core/InputLabel"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
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

import { styles } from "./components"

const TableWrapper = styled.div`
	margin-bottom: 10px;
	width: 100%;
	overflow-x: auto;
`
const TotalContainer = styled.div`
	padding: 10px;
	background-color: ${props => props.theme.grey[200]};
	border-radius: 4px;
`
const TotalAmount = styled.div`
	display: flex;
	justify-content: space-between;
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

const PaymentContainer = styled.div`
	padding: 10px;
	background-color: ${props => props.theme.grey[200]};
	border: 1px solid ${props => props.theme.grey[300]};
	${media.md`
		padding: 20px;
	`}
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
			<Typography variant="h6" gutterBottom>
				Summary
			</Typography>
			<Paper className={classes.summaryWrapper}>
				<TableWrapper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.alignLeft}>Name</TableCell>
								<TableCell>Housing</TableCell>
								<TableCell>Group</TableCell>
								<TableCell className={classes.alignRight}>Amount</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell className={classes.alignLeft}>
									<strong>John Doe</strong>
								</TableCell>
								<TableCell>Bowler Hall</TableCell>
								<TableCell>Adult (18+)</TableCell>
								<TableCell className={classes.alignRight}>$150</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableWrapper>
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
							<DonateButton variant="outlined" size="small">
								$5
							</DonateButton>
							<DonateButton variant="outlined" size="small">
								$10
							</DonateButton>
							<DonateButton variant="contained" size="small" color="primary">
								$20
							</DonateButton>
							<DonateButton variant="outlined" size="small">
								$50
							</DonateButton>
							<DonateButton variant="outlined" size="small">
								$100
							</DonateButton>

							<FormControl className={classes.donateInput}>
								<Input
									id="adornment-amount"
									placeholder="Other"
									value=""
									startAdornment={
										<InputAdornment position="start">$</InputAdornment>
									}
								/>
							</FormControl>
						</ButtonGroup>
					</Grid>
					<Grid item xs={12} md={5}>
						<TotalContainer>
							<TotalAmount>
								<Typography variant="body2">Donation</Typography>
								<Typography variant="body2">$10</Typography>
							</TotalAmount>
							<Divider className={classes.divider} />
							<TotalAmount>
								<strong>Total</strong>
								<strong>$150 USD</strong>
							</TotalAmount>
						</TotalContainer>
					</Grid>
				</Grid>
			</Paper>

			<Grid container spacing={40}>
				<Grid item xs={12} md={6}>
					<Typography className={classes.cardName}>Billing Details</Typography>

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
					<Grid container spacing={8}>
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
				</Grid>
				<Grid item xs={12} md={6}>
					<PaymentContainer>
						<TotalAmount>
							<strong>TOTAL</strong>
							<strong>$150 USD</strong>
						</TotalAmount>

						<Divider className={classes.divider} />

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
						<Grid container spacing={8}>
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
					</PaymentContainer>
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
