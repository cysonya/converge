import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

const TableWrapper = styled.div`
	margin-bottom: 10px;
	width: 100%;
	overflow-x: auto;
	white-space: nowrap;
`
const styles = {
	paper: {
		margin: "0 10px"
	}
}

const InternalAttendants = ({ attendants, classes }) => {
	if (!attendants) return null

	return (
		<Paper className={classes.paper}>
			<TableWrapper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Age Group</TableCell>
							<TableCell>Package</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{attendants.map((attendant, i) => (
							<TableRow key={i}>
								<TableCell>
									{attendant.first_name} {attendant.last_name}
								</TableCell>
								<TableCell>{attendant.group.description}</TableCell>
								<TableCell>{attendant.package.title}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableWrapper>
		</Paper>
	)
}

InternalAttendants.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		attendants: state.dashboard.attendants
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Attendants = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalAttendants)

export default withStyles(styles)(Attendants)
