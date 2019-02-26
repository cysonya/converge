export const FETCH_EVENTS = "FETCH_EVENTS"
export const SET_EVENTS_DATA = "SET_EVENTS_DATA"

// Triggers fetch-event saga to fetch events data from api
export function fetchEvents() {
	return { type: FETCH_EVENTS }
}
export function setEventsData(data) {
	return { type: SET_EVENTS_DATA, data }
}
