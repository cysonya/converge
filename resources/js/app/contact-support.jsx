import Button from "@material-ui/core/Button"
import CloseIcon from "@material-ui/icons/Close"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import { Form, Formik, Field } from "formik"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import api from "@/apis"
import { Input, inputError } from "@/app/components/form/index"

import { media } from "@/styles/utils"
const Container = styled.div`
	padding: 8px;
	width: calc(100% - 20px);
	margin: 0 auto;
	text-align: center;
	font-size: 12px;
	color: ${props => props.theme.grey[900]};
	border-top: 1px solid ${props => props.theme.grey[400]};
	${media.md`
		width: auto;
		color: ${props => props.theme.grey[200]};
		background-color: ${props => props.theme.grey[900]};
	`}
`
const styles = theme => ({
	paper: {
		width: "90%",
		margin: "0 auto",
		[theme.breakpoints.up("md")]: {
			width: "auto",
			minWidth: "650px"
		}
	}
})
const ContactSupport = withStyles(styles)(
	class extends Component {
		constructor(props) {
			super(props)

			this.state = {
				open: false
			}
		}

		handleOpenDialog() {
			this.setState({ open: true })
		}

		handleCloseDialog() {
			this.setState({ open: false })
		}

		handleValidate(values) {
			let errors = {}

			if (!values.name) {
				errors.name = "Please provide name"
			}
			if (!values.email) {
				errors.email = "Please provide email"
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
			) {
				errors.email = "Invalid email address"
			}
			if (!values.message) {
				errors.message = "Please leave a message"
			}
			return errors
		}

		render() {
			const { classes } = this.props
			let initialValues = {
				name: "",
				email: "",
				message: "",
				site_token: Cookies.get("site_token")
			}
			return (
				<div>
					<Container>
						Need assistance?{" "}
						<Link
							component="button"
							variant="body2"
							style={{ fontSize: "12px" }}
							onClick={() => this.handleOpenDialog()}
						>
							Contact support
						</Link>
					</Container>
					<Dialog
						open={this.state.open}
						onClose={e => this.handleCloseDialog()}
						aria-labelledby="contact-support"
						classes={classes}
					>
						<Formik
							initialValues={initialValues}
							validate={values => {
								return this.handleValidate(values)
							}}
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(true)
								api.post("/contact", values).then(data => {
									setTimeout(() => {
										this.setState({ open: false })
										setSubmitting(false)
									}, 1000)
								})
							}}
							render={({ errors, isSubmitting, touched, values }) => {
								return (
									<Form>
										<DialogContent>
											<Typography variant="h6" gutterBottom>
												Contact Form
											</Typography>
											<Grid container spacing={8}>
												<Grid item xs={6}>
													<Field
														name="name"
														render={({ field, form }) => (
															<Input
																label="Your Name"
																autocompplete="given-name"
																error={inputError(form, "name")}
																touched={touched.name}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={6}>
													<Field
														name="email"
														render={({ field, form }) => (
															<Input
																label="Your Email"
																type="email"
																autocompplete="email"
																error={inputError(form, "email")}
																touched={touched.email}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12}>
													<Field
														name="message"
														render={({ field, form }) => (
															<Input
																label="Message"
																multiline
																rows="5"
																error={inputError(form, "message")}
																{...field}
															/>
														)}
													/>
												</Grid>
											</Grid>
											<Grid container spacing={8} justify="flex-end">
												<Grid item>
													<Button onClick={e => this.handleCloseDialog()}>
														Cancel
													</Button>
												</Grid>
												<Grid item>
													<Button
														type="submit"
														variant="contained"
														color="primary"
														disabled={isSubmitting}
													>
														{isSubmitting ? "Sending..." : "Send"}
													</Button>
												</Grid>
											</Grid>
										</DialogContent>
									</Form>
								)
							}}
						/>
					</Dialog>
				</div>
			)
		}
	}
)

export default ContactSupport
