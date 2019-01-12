import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const InternalNavigation = ({ isLoggedIn }) => (
  <div>
    <Link to="/">Dashboard</Link>
    <Link to="/login">Sign In</Link>
    <Link to="/register">Register</Link>
  </div>
)

InternalNavigation.propTypes = {}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNavigation)

export default Navigation
