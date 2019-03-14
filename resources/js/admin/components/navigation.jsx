import AppBar from "@material-ui/core/AppBar"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import React, { Component } from "react"
import ReactDOM from "react-dom"

import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { isMobile } from "@/helpers/application"
import NavigationLinks from "./navigation-links"

const drawerWidth = 200
const styles = theme => ({
	drawer: {
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	drawerPaper: {
		width: drawerWidth,
		color: "#FFF",
		backgroundColor: theme.palette.common.background,
		border: 0
	},
	appBar: {
		marginLeft: drawerWidth,
		backgroundColor: "#FFF",
		[theme.breakpoints.up("md")]: {
			display: "none",
			width: `calc(100% - ${drawerWidth}px)`
		}
	}
})

export class Navigation extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: isMobile(this.props.width) ? false : true
		}
	}

	handleDrawerToggle() {
		this.setState({ open: !this.state.open })
	}

	render() {
		const { classes, width } = this.props
		return (
			<div>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar variant="dense" style={{ paddingLeft: 0 }}>
						<IconButton
							className="hidden-md-up"
							onClick={() => this.handleDrawerToggle()}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer}>
					<Drawer
						variant={isMobile(width) ? "temporary" : "persistent"}
						open={this.state.open}
						onClose={() => this.handleDrawerToggle()}
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<NavigationLinks />
					</Drawer>
				</nav>
			</div>
		)
	}
}

export default withStyles(styles)(withWidth()(Navigation))
