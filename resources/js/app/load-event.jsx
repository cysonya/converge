import React, { Component } from "react";
import styled from "styled-components";
import { Elements, injectStripe } from "react-stripe-elements";

import { fetchEvent } from "@/app-store/actions";
import { media } from "@/styles/utils";
import EventForm from "./event/form";

class LoadEvent extends Component {
	componentWillMount() {
		appStore.dispatch({ type: "FETCH_EVENT", id: this.props.match.params.id });
	}

	render() {
		const Container = styled.div`
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			height: 100%;
			width: 100%;
			${media.md`
				margin-bottom: 50px;
			`}
		`;
		return (
			<Container>
				<Elements>
					<EventForm />
				</Elements>
			</Container>
		);
	}
}

export default LoadEvent;
