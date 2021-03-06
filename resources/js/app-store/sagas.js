import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLatest,
	throttle
} from "redux-saga/effects"

import applyCoupon from "./sagas/applyCoupon"
import fetchEvent from "./sagas/fetch-event"
import filterPackages from "./sagas/filter-packages"
import submitOrder from "./sagas/submit-order"

function* rootSaga() {
	yield all([
		takeLatest("APPLY_COUPON", applyCoupon),
		takeLatest("FETCH_EVENT", fetchEvent),
		takeLatest("FILTER_PACKAGES", filterPackages),
		takeLatest("PLACE_ORDER", submitOrder)
	])
}

export default rootSaga
