import axios from "axios"
import { call, put, select } from "redux-saga/effects"

export default function* submitOrder(action) {
	const state = yield select()

	axios
		.post(`/events/${state.event.id}/checkout`, action.values)
		.then(response => {
			console.log("RESPONSE: ", response)
		})
		.catch(error => {
			console.log("ERR: ", error)
		})
}
