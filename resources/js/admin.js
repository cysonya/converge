/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap")

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import { MuiThemeProvider } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"

import { history, store } from "./admin-store/index"
import theme from "./styles/theme"

import Admin from "./admin/index"

window.adminStore = store

document.addEventListener("DOMContentLoaded", () => {
	const appPage = document.getElementById("admin_react")
	console.log("theme: ", theme)
	if (appPage) {
		ReactDOM.render(
			<Provider store={store}>
				<ThemeProvider theme={theme.palette}>
					<MuiThemeProvider theme={theme}>
						<Admin history={history} />
					</MuiThemeProvider>
				</ThemeProvider>
			</Provider>,
			appPage
		)
	}

	// Set user token to identify session in FS
	if (Cookies.get("site_token") == undefined) {
		Cookies.set("site_token", generateToken())
	}
	function generateToken() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			var r = (Math.random() * 16) | 0,
				v = c === "x" ? r : (r & 0x3) | 0x8
			return v.toString(16)
		})
	}

	if (typeof FS !== "undefined") {
		FS.setUserVars({
			token_str: Cookies.get("site_token")
		})
	}
})
