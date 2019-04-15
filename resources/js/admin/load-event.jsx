import React, { Component } from "react"

import Attendants from "./event/attendants"
import Dashboard from "./event/dashboard"
import Packages from "./event/packages"
import Settings from "./event/settings"

class LoadEvent extends Component {
	componentWillMount() {
		adminStore.dispatch({
			type: "FETCH_EVENT_DASHBOARD",
			id: this.props.match.params.eventId
		})
	}

	render() {
		let content = <Dashboard />

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

export default LoadEvent
