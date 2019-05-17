import CloseIcon from "@material-ui/icons/Close"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import IconButton from "@material-ui/core/IconButton"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import { withStyles } from "@material-ui/core/styles"

import React, { Component } from "react"
import styled from "styled-components"

import AttendantsCreate from "./event/attendants-create"
import PackageEdit from "./event/package-edit"

const ModalHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	color: white;
	font-size: 18px;
	background-color: ${props => props.theme.common.background};
`
const styles = theme => ({
	paper: {
		[theme.breakpoints.up("md")]: {
			width: "auto",
			minWidth: "550px",
			maxWidth: "70vh"
		}
	},
	content: {
		padding: "24px"
	}
})

class ModalConductor extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { classes, fullScreen, history, match, model } = this.props

		let content = null
		let title = null
		switch (model) {
			case "attendants-create":
				title = "Add Participants"
				content = <AttendantsCreate />
				break
			case "package-edit":
				let pkgId = match.params.packageId
				let pkg = adminStore
					.getState()
					.dashboard.packages.find(p => p.id == pkgId)
				title = (
					<div>
						Edit Housing: <em>{pkg.title}</em>
					</div>
				)
				content = <PackageEdit pkgId={pkgId} />
				break
			default:
				content = null
		}

		return (
			<Dialog
				open={true}
				fullScreen={fullScreen}
				onClose={e => history.goBack()}
				classes={{ paper: classes.paper }}
			>
				<ModalHeading>
					{title}
					<IconButton
						className="p-rm"
						color="inherit"
						onClick={() => history.goBack()}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</ModalHeading>

				<DialogContent className={classes.content}>{content}</DialogContent>
			</Dialog>
		)
	}
}
export default withStyles(styles)(withMobileDialog()(ModalConductor))
