import Divider from "@material-ui/core/Divider"
import LockIcon from "@material-ui/icons/Lock"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { getOrderTotal } from "@/app/helpers"
import { media } from "@/styles/utils"
import { currency } from "@/helpers/application"

import { styles, TotalAmount } from "./components"
import CouponField from "./coupon-field"

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.grey[300]};
  ${media.md`
    margin-bottom: 8px;
  `}
`
const InternalOrderSummary = ({
  classes,
  formProps,
  orderTotal,
  pkgSummary
}) => {
  return (
    <div>
      <SectionTitle>
        <LockIcon className="pr-5" /> Order Summary
      </SectionTitle>
      {Object.keys(pkgSummary).map((pkg, i) => (
        <TotalAmount key={i}>
          <Typography variant="body2">
            {pkgSummary[pkg].title}{" "}
            {pkgSummary[pkg].quantity > 0 && (
              <strong>x {pkgSummary[pkg].quantity}</strong>
            )}
          </Typography>
          <Typography variant="body2">
            {currency(pkgSummary[pkg].price)}
          </Typography>
        </TotalAmount>
      ))}
      {parseInt(formProps.values.donation) > 0 && (
        <TotalAmount>
          <Typography variant="body2">Donation</Typography>
          <Typography variant="body2">
            {currency(formProps.values.donation)}
          </Typography>
        </TotalAmount>
      )}
      <Divider className={classes.divider} />
      {/* Coupon discount */}
      {formProps.values.coupon.discount < 0 && (
        <TotalAmount>
          <Typography variant="body2" gutterBottom>
            Discount: {formProps.values.coupon.code}
          </Typography>
          <Typography variant="body2" gutterBottom>
            -{currency(-formProps.values.coupon.discount)}
          </Typography>
        </TotalAmount>
      )}
      <TotalAmount className="mb-10">
        <strong>Total</strong>
        <strong>{currency(orderTotal)} USD</strong>
      </TotalAmount>
      <CouponField formProps={formProps} />
    </div>
  )
}

InternalOrderSummary.propTypes = {}

const getPkgSummary = (state, ownProps) => {
  const pkgs = state.event.packages
  let summary = {}

  // Get quantity for each package ordered with cost per package
  // ex: {2: {quantity: 2, price: 110}}
  ownProps.formProps.values.registrants.forEach(registrant => {
    if (summary.hasOwnProperty(registrant.package)) {
      let pkg = pkgs.find(p => p.id === registrant.package)
      summary[registrant.package].quantity += 1
      summary[registrant.package].price += parseInt(
        pkg.groups.find(g => g.id === registrant.group).price
      )
    } else {
      let pkg = pkgs.find(p => p.id === registrant.package)
      summary[registrant.package] = {
        quantity: 1,
        price: parseInt(pkg.groups.find(g => g.id === registrant.group).price),
        title: pkg.title
      }
    }
  })
  return summary
}

const mapStateToProps = (state, ownProps) => {
  return {
    orderTotal: getOrderTotal(state, ownProps),
    pkgSummary: getPkgSummary(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const OrderSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InternalOrderSummary))

export default OrderSummary
