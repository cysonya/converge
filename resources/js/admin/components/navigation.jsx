import AppBar from "@material-ui/core/AppBar"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
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

const drawerWidth = 200
const styles = theme => ({
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	drawerPaper: {
		width: drawerWidth,
		color: "#FFF",
		backgroundColor: "#2f3558"
	},
	appBar: {
		marginLeft: drawerWidth,
		backgroundColor: "#FFF",
		[theme.breakpoints.up("sm")]: {
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
		const { classes } = this.props
		return (
			<div>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar variant="dense">
						<IconButton onClick={() => this.handleDrawerToggle()}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6">Converge</Typography>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer}>
					<Drawer
						variant="persistent"
						open={this.state.open}
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<List>
							<ListItem>Hello</ListItem>
						</List>
					</Drawer>
				</nav>
			</div>
		)
	}
}

export default withStyles(styles)(withWidth()(Navigation))
