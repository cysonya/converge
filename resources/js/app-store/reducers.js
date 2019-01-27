import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import { SET_EVENT_DATA } from './actions'

function event(state = {}, action) {
	let newState = Object.assign({}, state)

  switch (action.type) {
  	case SET_EVENT_DATA:
			Object.keys(action.data).map((key) => {
				newState[key] = action.data[key]
			})
  	  return newState
    default:
      return state
  }
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    event
  })
