import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

const Link = styled.a`
	display: inline-flex;
	align-items: center;
	color: ${props => props.theme.grey[900]};
	font-weight: 500;
	&:hover {
		color: ${props => props.theme.secondary.main};
	}
`
const InternalTopBar = ({ eventId }) => {
	return (
		<div>
			{eventId && window.location.pathname.includes("event") ? (
				<Link href={`/events/${eventId}`} target="_blank">
					<RemoveRedEyeIcon className="pr-5" /> Event Page
				</Link>
			) : null}
		</div>
	)
}

InternalTopBar.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		eventId: state.dashboard.event ? state.dashboard.event.id : null
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const TopBar = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalTopBar)

export default TopBar
