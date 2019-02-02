import React, { Component } from "react"
import styled from "styled-components"

import { fetchEvent } from "@/app-store/actions"
import { media } from "@/styles/utils"
import EventForm from "./form"

class Event extends Component {
	componentWillMount() {
		appStore.dispatch({ type: "FETCH_EVENT", id: this.props.match.params.id })
	}

	render() {
		const Container = styled.div`
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
			${media.md`
				margin-top: 80px;
				margin-bottom: 50px;
			`}
		`
		return (
			<Container>
				<EventForm />
			</Container>
		)
	}
}

export default Event
