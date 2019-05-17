import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Attendants from "./event/attendants"
import Dashboard from "./event/dashboard"
import Packages from "./event/packages"
import Settings from "./event/settings"

class InternalLoadEvent extends Component {
	componentWillMount() {
		adminStore.dispatch({
			type: "FETCH_EVENT_DASHBOARD",
			id: this.props.match.params.eventId
		})
	}

	render() {
		let content = <Dashboard />
		const { event } = this.props
		if (!event) return null

		if (this.props.match.url.includes("packages")) {
			content = <Packages />
		} else if (this.props.match.url.includes("attendants")) {
			content = <Attendants />
		} else if (this.props.match.url.includes("settings")) {
			content = <Settings />
		}
		return content
	}
}

InternalLoadEvent.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		event: state.dashboard.event
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const LoadEvent = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalLoadEvent)

export default LoadEvent
