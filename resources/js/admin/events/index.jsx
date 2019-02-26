import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import EventListings from "./event-listings"

class Events extends Component {
	componentWillMount() {
		adminStore.dispatch({ type: "FETCH_EVENTS" })
	}

	render() {
		return <EventListings />
	}
}

export default Events
