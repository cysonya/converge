export const FETCH_EVENT = "FETCH_EVENT"
export const PLACE_ORDER = "PLACE_ORDER"
export const REMOVE_ORDER_ERROR = "REMOVE_ORDER_ERROR"
export const SET_EVENT_DATA = "SET_EVENT_DATA"
export const SET_STEP = "SET_STEP"
export const UPDATE_ORDER = "UPDATE_ORDER"

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

// Set order status
export function updateOrder(data) {
	return { type: UPDATE_ORDER, data }
}
// Remove order error
export function removeOrderError() {
	return { type: REMOVE_ORDER_ERROR }
}
