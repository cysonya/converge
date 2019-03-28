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
import fetchEvent from "./sagas/fetch-event"
import updatePackage from "./sagas/update-package"

function* rootSaga() {
	yield all([
		takeLatest("FETCH_EVENTS", fetchEvents),
		takeLatest("FETCH_EVENT", fetchEvent),
		takeLatest("UPDATE_PACKAGE", updatePackage)
	])
}

export default rootSaga
