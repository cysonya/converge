import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLatest,
	throttle
} from "redux-saga/effects"

import fetchEvent from "./sagas/fetch-event"

function* rootSaga() {
	yield all([
		takeLatest("FETCH_EVENT", fetchEvent)
	])
}

export default rootSaga
