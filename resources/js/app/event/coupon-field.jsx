import Button from "@material-ui/core/Button"
import Collapse from "@material-ui/core/Collapse"
import InputAdornment from "@material-ui/core/InputAdornment"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"

import { Field, getIn } from "formik"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { applyCoupon } from "@/app-store/actions"

const styles = {
  couponBtn: {
    paddingLeft: "0",
    textTransform: "none"
  }
}
const InternalCouponField = ({
  apply,
  classes,
  couponApplied,
  formProps,
  remove
}) => {
  const [showCouponField, setShowCouponField] = useState(false)

  return (
    <div>
      {!showCouponField && !couponApplied && (
        <Button
          className={classes.couponBtn}
          color="primary"
          size="small"
          onClick={() => setShowCouponField(true)}
        >
          Have a coupon code?
        </Button>
      )}
      <Collapse in={showCouponField || couponApplied}>
        {formProps.values.registrants.length > 1 && (
          <Field
            name="coupon.registrantIndex"
            render={({ field }) => (
              <TextField
                className="mb-5"
                label={couponApplied ? "" : "Select speaker"}
                fullWidth
                select
                disabled={couponApplied}
                {...field}
              >
                <MenuItem value="" />
                {formProps.values.registrants.map((reg, i) => (
                  <MenuItem key={"cr" + i} value={i}>
                    {reg.first_name} {reg.last_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        )}
        <Collapse
          in={
            formProps.values.registrants.length === 1 ||
            formProps.values.coupon.registrantIndex !== ""
          }
        >
          <Field
            name="coupon.code"
            render={({ field }) => {
              const couponError = getIn(formProps.errors, "coupon.code")
              let helperText = ""
              if (formProps.values.coupon.discount < 0) {
                helperText = "Coupon applied!"
              } else if (!!couponError) {
                helperText = couponError
              }
              return (
                <TextField
                  label={couponApplied ? "" : "Enter coupon code"}
                  helperText={helperText}
                  error={!!couponError}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {couponApplied ? (
                          <Button size="small" onClick={() => remove()}>
                            Remove
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            size="small"
                            onClick={() => apply()}
                          >
                            APPLY
                          </Button>
                        )}
                      </InputAdornment>
                    )
                  }}
                  disabled={couponApplied}
                  {...field}
                />
              )
            }}
          />
        </Collapse>
      </Collapse>
    </div>
  )
}

InternalCouponField.propTypes = {}

const mapStateToProps = (state, ownProps) => {
  return {
    couponApplied: ownProps.formProps.values.coupon.discount < 0,
    groups: state.event.groups,
    packages: state.event.packages
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch }
}
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { formProps } = ownProps
  const { groups, packages } = stateProps
  const { dispatch } = dispatchProps
  const { values } = formProps

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    apply: () => {
      dispatch(applyCoupon(formProps))
    },
    remove: () => {
      formProps.setFieldValue("coupon.code", "")
      formProps.setFieldValue("coupon.discount", "")
    }
  }
}

const CouponField = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(InternalCouponField))

export default CouponField
