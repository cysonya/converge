import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import styled from "styled-components"

const TableWrapper = styled.div`
	margin-bottom: 10px;
	overflow-x: auto;
	white-space: nowrap;
`

const styles = {
	table: {
		width: "auto"
	}
}

const AttendantsTable = ({ attendants, classes }) => {
	return (
		<TableWrapper>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Age Group</TableCell>
						<TableCell>Housing</TableCell>
						<TableCell>Affiliate</TableCell>
						<TableCell>Roommates</TableCell>
						<TableCell>Dietary</TableCell>
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
							<TableCell>{attendant.custom_properties.affiliate}</TableCell>
							<TableCell>{attendant.custom_properties.roommates}</TableCell>
							<TableCell>{attendant.custom_properties.dietary}</TableCell>
							<TableCell>...</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableWrapper>
	)
}

AttendantsTable.propTypes = {}

export default withStyles(styles)(AttendantsTable)
