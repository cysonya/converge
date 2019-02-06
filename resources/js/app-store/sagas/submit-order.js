import { call, put, select } from "redux-saga/effects"

import api from "@/apis"
import { updateOrder } from "../actions"

export default function* submitOrder(action) {
	const state = yield select()

	const response = yield call(
		api.post,
		`/events/${state.event.id}/checkout`,
		action.values
	)
	yield put(updateOrder(response))
}
