import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import CloseIcon from "@material-ui/icons/Close"
import Collapse from "@material-ui/core/Collapse"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import React, { Component } from "react"
import styled from "styled-components"

import { media } from "@/styles/utils"

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
const NavMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  ${media.md`
    display: flex;
  `}
`
const MenuItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.grey[200]} ${media.md`
    margin-right: 20px;
    padding: 0;
    border-bottom: none;
  `};
`
const MenuLink = styled.a`
  color: black;
  font-size: 13px;
  font-weight: 600;
  opacity: 0.75;
  text-transform: uppercase;
  text-decoration: none;
  :hover,
  :focus {
    color: ${props => props.theme.secondary.main};
  }
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
    console.log("CLOSE")
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
            <NavMenu>
              <MenuItem>
                <MenuLink href="https://convergefest.com" target="_blank">
                  Home
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink href="https://convergefest.com/about" target="_blank">
                  About
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink
                  href="https://convergefest.com/speakers"
                  target="_blank"
                >
                  Speakers
                </MenuLink>
              </MenuItem>
            </NavMenu>
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
          <NavMenu>
            <MenuItem>
              <MenuLink href="https://convergefest.com" target="_blank">
                Home
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="https://convergefest.com/about" target="_blank">
                About
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink
                href="https://convergefest.com/speakers"
                target="_blank"
              >
                Speakers
              </MenuLink>
            </MenuItem>
          </NavMenu>
        </Collapse>
      </NavBar>
    )
  }
}

export default Navigation
