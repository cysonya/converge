import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const InternalCouponField = ({}) => {
  return (
    <TextField
      label="Enter coupon code"
      helperText="Coupon code applied!"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button color="primary">APPLY</Button>
          </InputAdornment>
        )
      }}
    />
  )
}

InternalCouponField.propTypes = {}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const CouponField = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalCouponField)

export default CouponField
