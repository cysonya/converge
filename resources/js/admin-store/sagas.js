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

function* rootSaga() {
	yield all([takeLatest("FETCH_EVENTS", fetchEvents)])
}

export default rootSaga
