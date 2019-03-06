export const FETCH_EVENTS = "FETCH_EVENTS"
export const SET_EVENTS_DATA = "SET_EVENTS_DATA"

export const FETCH_EVENT = "FETCH_EVENT"
export const UPDATE_EVENT = "UPDATE_EVENT"

// Triggers fetch-events saga
export function fetchEvents() {
	return { type: FETCH_EVENTS }
}
export function setEventsData(data) {
	return { type: SET_EVENTS_DATA, data }
}

export function fetchEvent(id) {
	return { type: FETCH_EVENT, id }
}

export function updateEvent(data) {
	return { type: UPDATE_EVENT, data }
}

