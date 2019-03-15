import { all, call, put, select } from "redux-saga/effects"

import { updatePackage } from "../actions"

export default function* filterPackages(action) {
	const state = yield select()
	const eventPkgs = state.event.packages

	yield all(
		state.event.packages.map((p, index) => call(findSelected, p, index, action))
	)
}

function* findSelected(p, index, action) {
	let selectedPkgs = action.registrants.filter(reg => reg.package === p.id)
	// Update package remain qty if selected
	if (selectedPkgs.length > 0) {
		yield put(
			updatePackage(index, {
				remain: p.quantity_remaining - selectedPkgs.length
			})
		)
	} else {
		// Reset remain qty if not
		yield put(updatePackage(index, { remain: p.quantity_remaining }))
	}
}
