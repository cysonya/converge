import React, { Component } from "react"

import { fetchEvent } from "@/app-store/actions"
class Event extends Component {
	componentWillMount() {
		appStore.dispatch({type: "FETCH_EVENT", id: this.props.match.params.id})
	}
	render() {
		return (
			<div>Event {this.props.match.params.id}</div>
		)
	}
}

export default Event