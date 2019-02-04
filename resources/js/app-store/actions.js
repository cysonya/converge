export const FETCH_EVENT = "FETCH_EVENT"
export const PLACE_ORDER = "PLACE_ORDER"
export const SET_EVENT_DATA = "SET_EVENT_DATA"
export const SET_STEP = "SET_STEP"

// Triggers sumibt-order saga to register attendants and pay for order
export function placeOrder(values, setSubmitting) {
	return { type: PLACE_ORDER, values, setSubmitting }
}

// Triggers fetch-event saga to fetch data from api
export function fetchEvent(id) {
	return { type: FETCH_EVENT, id }
}

// Sets event data store
export function setEventData(data) {
	return { type: SET_EVENT_DATA, data }
}

// Sets step index
export function setStep(index) {
	return { type: SET_STEP, index }
}
