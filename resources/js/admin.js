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

import Button from "@material-ui/core/Button"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { SnackbarProvider } from "notistack"
import { ThemeProvider } from "styled-components"

import Admin from "./admin/index"
import { history, store } from "./admin-store/index"
import theme from "./styles/theme"

window.adminStore = store

document.addEventListener("DOMContentLoaded", () => {
	const appPage = document.getElementById("admin_react")
	console.log("theme: ", theme)
	if (appPage) {
		ReactDOM.render(
			<Provider store={store}>
				<ThemeProvider theme={theme.palette}>
					<MuiThemeProvider theme={theme}>
						<SnackbarProvider
							autoHideDuration={8000}
							maxSnack={3}
							action={<Button size="small">{"Dismiss"}</Button>}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center"
							}}
						>
							<Admin history={history} />
						</SnackbarProvider>
					</MuiThemeProvider>
				</ThemeProvider>
			</Provider>,
			appPage
		)
	}
})
