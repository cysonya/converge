import { call, put, select } from "redux-saga/effects"

import api from "@/apis"
import { setEventDashboard } from "../actions"

export default function* fetchEventDashboard(action) {
	const state = yield select()

	// Fetches event only once
	if (!state.dashboard.event || state.dashboard.event.id != action.id) {
		const result = yield call(api.authGet, `/api/events/${action.id}/dashboard`)
		yield put(setEventDashboard(result))
	}
}
