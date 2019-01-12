import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

function app(state = { test: "" }, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    app
  })
