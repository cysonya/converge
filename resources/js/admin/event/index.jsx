import React, { Component } from "react"

import Dashboard from "./dashboard"

class Event extends Component {
	componentWillMount() {
		adminStore.dispatch({ type: "FETCH_EVENT", id: this.props.match.params.id })
	}

	render() {
		return (
			<div>
				<Dashboard />
			</div>
		)
	}
}

export default Event
