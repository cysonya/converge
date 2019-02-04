import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import { SET_EVENT_DATA, SET_STEP } from "./actions"

function event(state = {}, action) {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case SET_EVENT_DATA:
      Object.keys(action.data).map(key => {
        newState[key] = action.data[key]
      })
      return newState
      break
    case SET_STEP:
      newState.step = action.index
      return newState
      break
    default:
      return state
  }
}

function order(state={status: "incomplete", error: null, data: {}}, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    default:
      return state
  }
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    event,
    order
  })
