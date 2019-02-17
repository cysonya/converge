import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

function event(state = {}, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    default:
      return state;
  }
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    event
  });
