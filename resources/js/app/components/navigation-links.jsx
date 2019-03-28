import React from "react"
import styled from "styled-components"

import { media } from "@/styles/utils"
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

const NavigationLinks = () => (
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
			<MenuLink href="https://convergefest.com/speakers" target="_blank">
				Speakers
			</MenuLink>
		</MenuItem>
		<MenuItem>
			<MenuLink href="https://convergefest.com/housing/" target="_blank">
				Housing
			</MenuLink>
		</MenuItem>
		<MenuItem>
			<MenuLink href="https://convergefest.com/donate/" target="_blank">
				Donate
			</MenuLink>
		</MenuItem>
		<MenuItem>
			<MenuLink href="https://convergefest.com/contact/" target="_blank">
				Contact
			</MenuLink>
		</MenuItem>
	</NavMenu>
)

export default NavigationLinks
