import React, { Component } from "react"

import Dashboard from "./event/dashboard"
import Packages from "./event/packages"

class LoadEvent extends Component {
	componentWillMount() {
		adminStore.dispatch({
			type: "FETCH_EVENT",
			id: this.props.match.params.eventId
		})
	}

	render() {
		let content = <Dashboard />
		if (this.props.match.url.includes("packages")) {
			content = <Packages />
		}
		return content
	}
}

export default LoadEvent
