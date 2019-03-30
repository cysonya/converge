export const FETCH_EVENTS = "FETCH_EVENTS"
export const SET_EVENTS_DATA = "SET_EVENTS_DATA"

export const FETCH_EVENT = "FETCH_EVENT"
export const SET_EVENT = "SET_EVENT"

export const UPDATE_PACKAGE = "UPDATE_PACKAGE"
export const SET_PACKAGE = "SET_PACKAGE"

export const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR"
export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR"

// Triggers fetch-events saga - fetches all event
export function fetchEvents() {
	return { type: FETCH_EVENTS }
}
export function setEventsData(data) {
	return { type: SET_EVENTS_DATA, data }
}
// Triggers fetch-event saga - fetches single event
export function fetchEvent(id) {
	return { type: FETCH_EVENT, id }
}
export function setEvent(data) {
	return { type: SET_EVENT, data }
}

export function updatePackage(values, setSubmitting) {
	return { type: UPDATE_PACKAGE, values, setSubmitting }
}
export function setPackage(data) {
	return { type: SET_PACKAGE, data }
}

export function enqueueSnackbar(notification) {
	return {
		type: ENQUEUE_SNACKBAR,
		notification: {
			key: new Date().getTime() + Math.random(),
			...notification
		}
	}
}

export function removeSnackbar(key) {
	return { type: REMOVE_SNACKBAR, key }
}
