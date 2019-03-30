import React from "react"
import { withSnackbar } from "notistack"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { removeSnackbar } from "@/admin-store/actions"

class Notifier extends React.Component {
  constructor(props) {
    super(props)

    /**
     * local state used to store the key of the displayed notifications
     * to avoid displaying them multiple times
     */
    this.state = {
      displayed: []
    }
  }

  render() {
    const { notifications } = this.props

    notifications.map(notification => {
      setTimeout(() => {
        // If notification already displayed, abort
        if (
          this.state.displayed.filter(key => key === notification.key).length >
          0
        ) {
          return
        }

        // Display notification using Snackbar
        this.props.enqueueSnackbar(notification.message, notification.options)
        // Add notification's key to the local state
        this.setState({
          displayed: [...this.state.displayed, notification.key]
        })
        // Dispatch action to remove the notification from the redux store
        this.props.removeSnackbar(notification.key)
      }, 300)
    })

    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ removeSnackbar }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Notifier))
