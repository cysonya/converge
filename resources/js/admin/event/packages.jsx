import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalPackages = ({}) => {
	return <div>Hello</div>
}

InternalPackages.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Packages = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalPackages)

export default Packages
