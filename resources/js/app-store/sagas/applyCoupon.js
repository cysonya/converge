import { call, put, select } from "redux-saga/effects"

import api from "@/apis"
import { getOrderTotal } from "@/app/helpers"

export default function* applyCoupon(action) {
  const state = yield select()
  const { values } = action.formProps
  const code = values.coupon.code

  const result = yield call(api.post, `/check_coupon`, { code: code })
  console.log("RESULT: ", result)

  if (result.error) {
    action.formProps.setFieldError("coupon.code", result.error)
  } else {
    // Valid coupon - Calculate discount
    let discount = 0
    const coupon = result.coupon
    if (result.coupon.type === "package_off") {
      const speaker =
        values.registrants[values.coupon.registrantIndex] ||
        values.registrants[0]
      const group = state.event.groups.find(g => g.id === speaker.group)
      const pkg = state.event.packages.find(p => p.id === speaker.package)
      discount = Math.round(pkg.groups.find(g => g.id === speaker.group).price)
      console.log("DISCOUNT: ", discount)
    } else if (result.oupon.type === "percent") {
      const orderTotal = getOrderTotal(state, { formProps: action.formProps })
      discount = Math.round(orderTotal * (coupon.discount_rate / 100))
    } else if (coupon.type === "amount") {
      discount = coupon.discount_amount
    }
    action.formProps.setFieldValue("coupon.discount", -discount)
  }
}
