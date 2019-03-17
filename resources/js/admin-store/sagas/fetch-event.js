import { call, put, select } from "redux-saga/effects"

import api from "@/apis"
import { updateEvent } from "../actions"

export default function* fetchEvents(action) {
	const state = yield select()

	// Fetches event only once
	if (!state.dashboard.event || state.dashboard.event.id != action.id) {
		const result = yield call(api.authGet, `/api/event/${action.id}/dashboard`)
		yield put(updateEvent(result))
	}
}
