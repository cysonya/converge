import Grid from "@material-ui/core/Grid"
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

const styles = theme => ({
	tableWrapper: {
		padding: "0 10px 10px",
		width: "100%",
		overflowX: "auto"
	},
	totalRow: {
		backgroundColor: theme.palette.grey[200]
	}
})

const TotalContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	background-color: ${props => props.theme.grey[200]};
	border-radius: 4px;
	${media.md`
		width: 45%;
		margin-left: auto;
	`}
`
const InternalBillingForm = ({ classes, width }) => {
	return (
		<div>
			<Typography variant="h6" gutterBottom>
				Summary
			</Typography>
			<Paper className={classes.tableWrapper}>
				<Table style={{ marginBottom: "10px" }}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Name</TableCell>
							<TableCell>Housing</TableCell>
							<TableCell>Group</TableCell>
							<TableCell align="right">Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell align="left">
								<strong>John Doe</strong>
							</TableCell>
							<TableCell>Bowler Hall</TableCell>
							<TableCell>Adult (18+)</TableCell>
							<TableCell align="right">$150</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<TotalContainer>
					<strong>Total</strong>
					<strong>$150 USD</strong>
				</TotalContainer>
			</Paper>
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
