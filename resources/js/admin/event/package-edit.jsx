import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalPackageEdit = ({ pkg }) => {
	console.log("PACKAGE: ", pkg)
	return (
		<div>
			<h1>Package</h1>
		</div>
	)
}

InternalPackageEdit.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		pkg: state.dashboard.packages[ownProps.pkgId]
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const PackageEdit = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalPackageEdit)

export default PackageEdit
