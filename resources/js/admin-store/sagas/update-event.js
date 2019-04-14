import { push } from "connected-react-router"
import { call, put } from "redux-saga/effects"

import api from "@/apis"
import { setEvent } from "../actions"

export default function* updateEvent(action) {
	const { values } = action
	console.log("TIME TO UPDATE: ", action)

	try {
		const response = yield call(
			api.authPost,
			`/api/events/${values.id}`,
			values
		)
		yield put(setEvent(response.data))
	} catch (error) {
		console.log(error)
	}
	action.setSubmitting(false)
}
