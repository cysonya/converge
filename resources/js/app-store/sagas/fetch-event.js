import axios from "axios";
import { call, put, select } from "redux-saga/effects"

import { setEventData } from "../actions"

export default function* fetchEvent(action) {
	const result = yield call(axios.get, `/api/events/${action.id}`)
	yield put(setEventData(result.data))
}