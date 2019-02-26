import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

function admin(state = {}, action) {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case "SET_EVENTS_DATA":
			newState.eventsList = action.data
			return newState
			break
		default:
			return state
	}
}

export default history =>
	combineReducers({
		router: connectRouter(history),
		admin
	})
