import AddIcon from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
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
				<Button
					component={NavLink}
					to={`/admin/events/${eventId}/attendants/create`}
					size="small"
					variant="contained"
					color="primary"
				>
					<AddIcon className="pr-5" fontSize="small" /> Add Participants
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
