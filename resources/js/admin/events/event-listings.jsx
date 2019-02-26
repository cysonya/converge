import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalEventListings = ({ events }) => {
	console.log("events: ", events)

	if (!events) return null
	return (
		<div>
			{events.map((event, index) => (
				<div key={index}>
					<h1>{event.title}</h1>
					<p>Attendants: {event.attendants_count}</p>
				</div>
			))}
		</div>
	)
}

InternalEventListings.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		events: state.admin.eventsList
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const EventListings = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalEventListings)

export default EventListings
