import React from "react"
import ReactDOM from "react-dom"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { media } from "@/styles/utils"
const Container = styled.div`
	padding: 8px;
	width: calc(100% - 20px);
	margin: 0 auto;
	text-align: center;
	font-size: 12px;
	color: ${props => props.theme.grey[900]};
	border-top: 1px solid ${props => props.theme.grey[700]};
	${media.md`
		width: auto;
		color: ${props => props.theme.grey[200]};
		background-color: ${props => props.theme.grey[900]};
	`}
`
const Link = styled(NavLink)`
	color: ${props => props.theme.primary.main};
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`
const InternalContactSupport = ({}) => {
	return (
		<Container>
			Need help? <Link to="/support">Contact support</Link>
		</Container>
	)
}

InternalContactSupport.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const ContactSupport = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalContactSupport)

export default ContactSupport
