export const FETCH_EVENT = "FETCH_EVENT"
export const FILTER_PACKAGES = "FILTER_PACKAGES"
export const PLACE_ORDER = "PLACE_ORDER"
export const PANEL_COMPLETE = "PANEL_COMPLETE"
export const PANEL_INCOMPLETE = "PANEL_INCOMPLETE"
export const REMOVE_ORDER_ERROR = "REMOVE_ORDER_ERROR"
export const SET_EVENT_DATA = "SET_EVENT_DATA"
export const SET_STEP = "SET_STEP"
export const UPDATE_ORDER = "UPDATE_ORDER"
export const UPDATE_PACKAGE = "UPDATE_PACKAGE"

// Triggers submit-order saga to register attendants and pay for order
export function placeOrder(values, setSubmitting) {
	return { type: PLACE_ORDER, values, setSubmitting }
}

// Triggers fetch-event saga
export function fetchEvent(id) {
	return { type: FETCH_EVENT, id }
}

// Triggers filter-packages saga
export function filterPackages(registrants) {
	return { type: FILTER_PACKAGES, registrants }
}
export function updatePackage(index, value) {
	return { type: UPDATE_PACKAGE, index, value }
}

// Changes `state.steps[step].complete` to true
export function panelComplete(step) {
	return { type: PANEL_COMPLETE, step }
}
// Changes `state.steps[step].complete` to false
export function panelIncomplete(step) {
	return { type: PANEL_INCOMPLETE, step }
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
