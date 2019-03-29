import { push } from "connected-react-router"
import { call, put } from "redux-saga/effects"

import api from "@/apis"
import { setPackage } from "../actions"

export default function* updatePackage(action) {
	const { values } = action

	try {
		const response = yield call(
			api.authPost,
			`/api/events/${values.event_id}/packages/${values.id}`,
			values
		)
		yield put(setPackage(response.data))

		// close modal
		yield put(push(`/admin/events/${values.event_id}/packages`))
	} catch (error) {
		console.log(error)
	}
	if (!!action.setSubmitting) {
		action.setSubmitting(false)
	}
}
