import { call, put } from "redux-saga/effects"

import api from "@/apis"
import { setEventData } from "../actions"

export default function* fetchEvent(action) {
	const result = yield call(api.get, `/api/events/${action.id}`)
	yield put(setEventData(result))
}
