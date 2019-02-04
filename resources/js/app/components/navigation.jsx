import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const InternalNavigation = ({ isLoggedIn }) => (
  <div>
    <img src={require('../../../images/layout/logo.svg')} />
    <ul>
      <li><a href="">About</a></li>
      <li><a href="">Something</a></li>
      <li><a href="">Speakers</a></li>
    </ul>
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
