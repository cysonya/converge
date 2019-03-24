import { call, put, select } from "redux-saga/effects"

import api from "@/apis"
import { updateOrder } from "../actions"

export default function* submitOrder(action) {
	const state = yield select()

	try {
		const response = yield call(
			api.post,
			`/events/${state.event.id}/checkout`,
			action.values
		)
		yield put(updateOrder(response))
		action.setSubmitting(false)
	} catch (error) {
		yield put(
			updateOrder({
				status: "error",
				error: "An error has occured. Please try again."
			})
		)
		action.setSubmitting(false)
	}
}
