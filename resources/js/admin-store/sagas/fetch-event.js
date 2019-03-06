import { call, put } from "redux-saga/effects"

import api from "@/apis"
import { updateEvent } from "../actions"

export default function* fetchEvents(action) {
	console.log("SDF")
	const result = yield call(api.get, `/api/events/${action.id}`)
	yield put(updateEvent(result))
}
