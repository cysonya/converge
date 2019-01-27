export const FETCH_EVENT = "FETCH_EVENT"
export const SET_EVENT_DATA = "SET_EVENT_DATA"

export function fetchEvent(id) {
	return { type: FETCH_EVENT, id }
}

export function setEventData(data) {
	return { type: SET_EVENT_DATA, data }
}
