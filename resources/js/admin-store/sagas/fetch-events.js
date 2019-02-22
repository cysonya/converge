import { call, put } from "redux-saga/effects"

import api from "@/apis"
import { setEventData } from "../actions"

export default function* fetchEvents(action) {
	const result = yield call(api.authGet, "/api/events")
	console.log("RESULTS: ", result)
	// yield put(setEventData(result))
}
