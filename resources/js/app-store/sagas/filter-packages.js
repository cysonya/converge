import { call, put, select } from "redux-saga/effects"

import { updatePackage } from "../actions"

export default function* filterPackages(action) {
	const state = yield select()
	const eventPkgs = state.event.packages

	state.event.packages.forEach((p, idx) => {
		console.log("REG: ", action.registrants, " P: ", p)
		let selectedPkg = action.registrants.filter(reg => reg.package === p.id)
		console.log("SELECTEDPKG: ", selectedPkg)
		if (selectedPkg.length > 0) {
			put(
				updatePackage(idx, {
					remain: p.quantity_remaining - selectedPkg.length
				})
			)
		} else {
			put(updatePackage(idx, { remain: p.quantity_remaining }))
		}
	})
}
