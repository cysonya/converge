import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

// List of events
function eventListings(state = [], action) {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case "SET_EVENTS_DATA":
			newState = action.data
			return newState
			break
		default:
			return state
	}
}

// Single event
function dashboard(state = {}, action) {
	let newState = Object.assign({}, state)
	switch (action.type) {
		case "SET_EVENT":
			newState = action.data
			return newState
			break
		case "SET_PACKAGE":
			let packages = newState.packages.map((p, i) => {
				if (p.id === action.data.id) {
					return Object.assign({}, p, action.data)
				}
				return p
			})
			return {
				...newState,
				packages: packages
			}
		default:
			return state
	}
}

export default history =>
	combineReducers({
		router: connectRouter(history),
		eventListings,
		dashboard
	})
