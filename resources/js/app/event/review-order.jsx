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
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

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
const InternalReviewOrder = ({ classes, width }) => {
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
				<TotalContainer>
					<TotalAmount>
						<strong>Total</strong>
						<strong>$300 USD</strong>
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
			</Grid>
		</div>
	)
}

InternalReviewOrder.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const ReviewOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalReviewOrder)))

export default ReviewOrder
