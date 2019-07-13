export const getPkgTotal = (state, ownProps) => {
  return ownProps.formProps.values.registrants.reduce((acc, registrant) => {
    let pkg = state.event.packages.find(p => p.id === registrant.package)
    return (
      acc + Math.round(pkg.groups.find(g => g.id === registrant.group).price)
    )
  }, 0)
}

export const getOrderTotal = (state, ownProps) => {
  const values = ownProps.formProps.values
  const today = new Date()

  let total =
    getPkgTotal(state, ownProps) + values.donation + values.coupon.discount

  if (pastDeadline) {
    total += values.registrants.length * 20
  }
  return total
}
