import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLatest,
	throttle
} from "redux-saga/effects";

import fetchEvent from "./sagas/fetch-event";
import submitOrder from "./sagas/submit-order";

function* rootSaga() {
	yield all([
		takeLatest("FETCH_EVENT", fetchEvent),
		takeLatest("PLACE_ORDER", submitOrder)
	]);
}

export default rootSaga;
