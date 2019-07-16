import AddIcon from "@material-ui/icons/Add"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import styled from "styled-components"

import AttendantsTable from "./attendants-table"

const ActionBar = styled.div`
	display: flex;
	margin: 0 0 20px;
`

const InternalAttendants = ({ attendants, eventId }) => {
	if (!attendants) return null

	return (
		<div>
			<ActionBar>
				{false && (
					<Button
						component={NavLink}
						to={`/admin/events/${eventId}/attendants/create`}
						size="small"
						variant="contained"
						color="primary"
					>
						<AddIcon className="pr-5" fontSize="small" /> Add Participants
					</Button>
				)}
				<Button
					href={`/admin/events/${eventId}/attendants/export`}
					target="_blank"
					size="small"
					variant="contained"
					color="primary"
				>
					<CloudDownloadIcon className="pr-5" fontSize="small" /> Export CSV
				</Button>
			</ActionBar>
			<Paper>
				<AttendantsTable attendants={attendants} />
			</Paper>
		</div>
	)
}

InternalAttendants.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		attendants: ownProps.attendants || state.dashboard.attendants,
		eventId: state.dashboard.event.id
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Attendants = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalAttendants)

export default Attendants
