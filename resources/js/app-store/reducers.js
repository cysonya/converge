import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import {
  REMOVE_ORDER_ERROR,
  SET_EVENT_DATA,
  SET_STEP,
  UPDATE_ORDER,
  UPDATE_PACKAGE
} from "./actions"

function event(state = { step: 0 }, action) {
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

function panels(
  state = [
    {
      name: "attendants",
      active: true,
      complete: false,
      hasCompleted: false,
      fields: [
        "first_name",
        "last_name",
        "customer_email",
        "group",
        "affiliate",
        "affiliate_other"
      ],
      title: "Participants"
    },
    {
      name: "housing",
      active: false,
      complete: false,
      hasCompleted: false,
      fields: ["package"],
      title: "Housing"
    },
    {
      name: "review",
      active: false,
      complete: false,
      hasCompleted: false,
      optional: true,
      fields: ["donation"],
      title: "Review"
    },
    {
      name: "payment",
      active: false,
      complete: false,
      hasCompleted: false,
      fields: [
        "payment.cardNumber",
        "payment.cardExpiry",
        "payment.cardCvc",
        "payment.postalCode"
      ],
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
      return newState
      break
    case "PANEL_INCOMPLETE":
      newState[action.step] = Object.assign({}, newState[action.step], {
        complete: false
      })
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
    order,
    panels
  })
