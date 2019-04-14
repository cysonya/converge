import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLatest,
	throttle
} from "redux-saga/effects"

import fetchEvents from "./sagas/fetch-events"
import fetchEventDashboard from "./sagas/fetch-event-dashboard"
import updateEvent from "./sagas/update-event"
import updatePackage from "./sagas/update-package"

function* rootSaga() {
	yield all([
		takeLatest("FETCH_EVENTS", fetchEvents),
		takeLatest("FETCH_EVENT_DASHBOARD", fetchEventDashboard),
		takeLatest("UPDATE_EVENT", updateEvent),
		takeLatest("UPDATE_PACKAGE", updatePackage)
	])
}

export default rootSaga
