import AppBar from "@material-ui/core/AppBar"
import Drawer from "@material-ui/core/Drawer"
import EventIcon from "@material-ui/icons/Event"
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
import { Route, NavLink } from "react-router-dom"
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
		backgroundColor: "#2f3558",
		border: 0
	},
	appBar: {
		marginLeft: drawerWidth,
		backgroundColor: "#FFF",
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	drawerMenu: {
		marginTop: "65px",
		paddingLeft: "20px"
	},
	menuItem: {
		padding: 0
	}
})

const LinkStyled = styled(NavLink)`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 10px 10px 10px 20px;
	font-size: 14px;
	color: #fff;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	&.active {
		background-color: ${props => props.theme.primary.main};
	}
`
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
					<Toolbar variant="dense">
						<IconButton onClick={() => this.handleDrawerToggle()}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6">Converge</Typography>
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
						<List className={classes.drawerMenu}>
							<ListItem className={classes.menuItem}>
								<LinkStyled to="/admin/dashboard">
									<EventIcon className="pr-5" />
									EVENTS
								</LinkStyled>
							</ListItem>
						</List>
					</Drawer>
				</nav>
			</div>
		)
	}
}

export default withStyles(styles)(withWidth()(Navigation))
