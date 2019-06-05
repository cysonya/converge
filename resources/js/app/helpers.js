export const getPkgTotal = (state, ownProps) => {
  return ownProps.formProps.values.registrants.reduce((acc, registrant) => {
    let pkg = state.event.packages.find(p => p.id === registrant.package)
    return (
      acc + Math.round(pkg.groups.find(g => g.id === registrant.group).price)
    )
  }, 0)
}

export const getOrderTotal = (state, ownProps) => {
  return (
    getPkgTotal(state, ownProps) +
    ownProps.formProps.values.donation +
    ownProps.formProps.values.coupon.discount
  )
}
