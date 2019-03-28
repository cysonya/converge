import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import CloseIcon from "@material-ui/icons/Close"
import Collapse from "@material-ui/core/Collapse"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import React, { Component } from "react"
import styled from "styled-components"

import { media } from "@/styles/utils"
import NavigationLinks from "./navigation-links"

const NavBar = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(82, 87, 135, 0.2);
  ${media.md`
    margin-bottom: 60px;
  `}
`
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  ${media.md`
    padding: 25px 0;
    width: 750px;
  `}
  ${media.lg`
    width: 1170px;
  `}
`
const Logo = styled.img`
  width: 150px;
  height: auto;
  ${media.md`
    width: 161px;
  `}
`

export class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }

  handleMenuToggle() {
    this.setState({ showMenu: !this.state.showMenu })
  }
  handleMenuClose() {
    this.setState({ showMenu: false })
  }

  render() {
    return (
      <NavBar>
        <NavContainer>
          <a href="https://convergefest.com" target="_blank">
            <Logo src={require("../../../images/layout/logo.svg")} />
          </a>
          <Hidden smDown>
            <NavigationLinks />
          </Hidden>

          <Hidden mdUp>
            <ClickAwayListener onClickAway={e => this.handleMenuClose()}>
              <IconButton
                onClick={e => this.handleMenuToggle()}
                color="inherit"
                aria-label="Menu"
              >
                {this.state.showMenu ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </ClickAwayListener>
          </Hidden>
        </NavContainer>

        <Collapse in={this.state.showMenu}>
          <NavigationLinks />
        </Collapse>
      </NavBar>
    )
  }
}

export default Navigation
