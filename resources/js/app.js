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

import { history, store } from "@/app-store/index"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./app/index"

window.appStore = store

document.addEventListener("DOMContentLoaded", () => {
	const appPage = document.getElementById("example")
	if (appPage) {
		ReactDOM.render(
			<Provider store={store}>
				<App history={history} />
			</Provider>,
			appPage
		)
	}
})
