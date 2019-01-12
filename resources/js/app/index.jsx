import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route } from "react-router-dom"

import Navigation from "./components/navigation"
const Dashboard = () => <div>Dashboard</div>
const SignIn = () => <div>SignIn</div>
const SignUp = () => <div>Register!</div>

const InternalApp = ({ history, match }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Navigation />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
      </div>
    </ConnectedRouter>
  )
}

InternalApp.propTypes = {}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalApp)

export default App
