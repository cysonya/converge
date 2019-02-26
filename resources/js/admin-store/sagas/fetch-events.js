import { call, put } from "redux-saga/effects"

import api from "@/apis"
import { setEventsData } from "../actions"

export default function* fetchEvents(action) {
	const result = yield call(api.authGet, "/api/events")
	yield put(setEventsData(result.events))
}
