import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Navigation from "./components/navigation";
import LoadEvent from "./load-event";

const InternalApp = ({ history, match }) => {
  return (
    <div>
      <Navigation />
      <ConnectedRouter history={history}>
        <Route exact path="/events/:id" component={LoadEvent} />
      </ConnectedRouter>
    </div>
  );
};

InternalApp.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalApp);

export default App;
