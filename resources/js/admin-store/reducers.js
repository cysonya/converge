import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

// List of events
function eventListings(state = [], action) {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case "SET_EVENTS_DATA":
			newState = action.data
			return newState
		default:
			return state
	}
}

// Single event
function dashboard(state = {}, action) {
	let newState = Object.assign({}, state)
	switch (action.type) {
		case "SET_EVENT_DASHBOARD":
			newState = action.data
			return newState
		case "SET_EVENT":
			newState.event = action.data
			return newState
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

function notifications(state = [], action) {
	switch (action.type) {
		case "ENQUEUE_SNACKBAR":
			let newState = [
				...state,
				{
					...action.notification
				}
			]
			return newState

		case "REMOVE_SNACKBAR":
			return state.filter(notification => notification.key !== action.key)

		default:
			return state
	}
}
export default history =>
	combineReducers({
		router: connectRouter(history),
		eventListings,
		dashboard,
		notifications
	})
