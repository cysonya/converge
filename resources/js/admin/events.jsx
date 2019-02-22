import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

class Events extends Component {
	componentWillMount() {
		adminStore.dispatch({ type: "FETCH_EVENTS" })
	}

	render() {
		return (
			<div>
				<h1>Events</h1>
			</div>
		)
	}
}

export default Events
