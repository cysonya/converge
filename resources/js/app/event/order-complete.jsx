import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalOrderComplete = ({}) => {
	return <div>Hello</div>
}

InternalOrderComplete.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const OrderComplete = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalOrderComplete)

export default OrderComplete
