import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import {
  REMOVE_ORDER_ERROR,
  SET_EVENT_DATA,
  SET_STEP,
  UPDATE_ORDER,
  UPDATE_PACKAGE
} from "./actions"

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
    case UPDATE_PACKAGE:
      let packages = newState.packages.map((p, i) => {
        if (i === action.index) {
          return Object.assign({}, p, action.value)
        }
        return p
      })
      return {
        ...newState,
        packages: packages
      }
      break
    default:
      return state
  }
}

function order(
  state = { status: "incomplete", error: null, data: {} },
  action
) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case UPDATE_ORDER:
      for (let data in action.data) {
        newState[data] = action.data[data]
      }
      return newState
      break
    case REMOVE_ORDER_ERROR:
      newState.error = null
      return newState
      break
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
