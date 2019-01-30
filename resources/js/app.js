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

import { history, store } from "./app-store/index"
import App from "./app/index"
import theme from "./styles/theme"

window.appStore = store
document.addEventListener("DOMContentLoaded", () => {
	const appPage = document.getElementById("app")
	console.log(theme)
	if (appPage) {
		ReactDOM.render(
			<Provider store={store}>
				<ThemeProvider theme={theme.palette}>
					<MuiThemeProvider theme={theme}>
						<App history={history} />
					</MuiThemeProvider>
				</ThemeProvider>
			</Provider>,
			appPage
		)
	}

	// TEMPORARY checkout
	var form = document.getElementById("order_form")
	if (form !== null) {
		form.addEventListener("submit", function(e) {
			e.preventDefault()
			console.log("SUBMITTED")
			Stripe.setPublishableKey("pk_test_s3Zd0EtHGeCQ3SOAyMtyGDGQ")

			Stripe.card.createToken(
				{
					name: "John Doe",
					number: document.getElementsByClassName("card-number")[0].value,
					cvc: document.getElementsByClassName("card-cvc")[0].value,
					exp_month: document.getElementsByClassName("card-expiry-month")[0]
						.value,
					exp_year: document.getElementsByClassName("card-expiry-year")[0].value
				},
				function(status, response) {
					console.log("STATUS: ", status)
					console.log("RESPONSE: ", response)
					var stripeInput =
						'<input type="hidden" name="stripeToken" value="' +
						response.id +
						'"" />'
					var stripeInput = document.createElement("input")
					stripeInput.type = "hidden"
					stripeInput.name = "stripeToken"
					stripeInput.value = response.id
					form.appendChild(stripeInput)
					form.submit()
				}
			)
		})
	}
})
