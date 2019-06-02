import { call, put } from "redux-saga/effects"

import api from "@/apis"

export default function* applyCoupon(action) {
  const code = action.formProps.values.coupon.code
  const result = yield call(api.post, `/check_coupon`, {code: code})
  if (result.error) {
    action.formProps.setFieldError('coupon.code', result.error)
  } else {
    action.formProps.setFieldValue('coupon.discount', action.discount)

  }

  console.log("RESULT: ", result)
}
