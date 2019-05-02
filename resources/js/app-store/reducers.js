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

function steps(
  state = [
    {
      name: "attendants",
      complete: false,
      hasCompleted: false,
      fields: ["first_name", "last_name", "email", "affiliation"],
      title: "Participants"
    },
    {
      name: "housing",
      complete: false,
      hasCompleted: false,
      fields: ["packages"],
      title: "Housing"
    },
    {
      name: "review",
      complete: false,
      hasCompleted: false,
      optional: true,
      fields: ["donation"],
      title: "Review"
    },
    {
      name: "payment",
      complete: false,
      hasCompleted: false,
      title: "Payment"
    }
  ],
  action
) {
  let newState = state.slice()
  switch (action.type) {
    case "PANEL_COMPLETE":
      newState[action.step] = Object.assign({}, newState[action.step], {
        complete: true
      })
      break
    case "PANEL_INCOMPLETE":
      newState[action.step] = Object.assign({}, newState[action.step], {
        complete: false
      })
      break
    default:
      return state
  }
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    event,
    order,
    steps
  })
