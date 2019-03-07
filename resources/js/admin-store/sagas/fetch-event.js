import { call, put } from "redux-saga/effects"

import api from "@/apis"
import { updateEvent } from "../actions"

export default function* fetchEvents(action) {
	const result = yield call(api.authGet, `/api/events/${action.id}/dashboard`)
	yield put(updateEvent(result))
}
