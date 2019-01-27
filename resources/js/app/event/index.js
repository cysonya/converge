import React, { Component } from "react"

import { fetchEvent } from "@/app-store/actions"
import Form from "./form"
class Event extends Component {
	componentWillMount() {
		appStore.dispatch({type: "FETCH_EVENT", id: this.props.match.params.id})
	}

	render() {
		return (
			<Form />
		)
	}
}

export default Event