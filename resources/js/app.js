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
import { StripeProvider } from "react-stripe-elements"

import { history, store } from "./app-store/index"
import App from "./app/index"
import theme from "./styles/theme"

window.appStore = store
document.addEventListener("DOMContentLoaded", () => {
	const appPage = document.getElementById("app_react")
	console.log("theme: ", theme)
	if (appPage) {
		ReactDOM.render(
			<Provider store={store}>
				<ThemeProvider theme={theme.palette}>
					<MuiThemeProvider theme={theme}>
						<StripeProvider apiKey={window.site.stripeKey}>
							<App history={history} />
						</StripeProvider>
					</MuiThemeProvider>
				</ThemeProvider>
			</Provider>,
			appPage
		)
	}
})
