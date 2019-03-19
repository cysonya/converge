import Button from "@material-ui/core/Button"
import CloseIcon from "@material-ui/icons/Close"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import { Form, Formik } from "formik"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { Input, inputError } from "@/app/components/form/index"

import { media } from "@/styles/utils"
const Container = styled.div`
	padding: 8px;
	width: calc(100% - 20px);
	margin: 0 auto;
	text-align: center;
	font-size: 12px;
	color: ${props => props.theme.grey[900]};
	border-top: 1px solid ${props => props.theme.grey[700]};
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
			width: "auto"
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
		render() {
			const { classes } = this.props
			let initialValues = {
				name: "",
				email: "",
				message: ""
			}
			console.log("CCc: ", classes)
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
						className={classes.root}
					>
						<Formik
							initialValues={initialValues}
							onSubmit={(values, { setSubmitting }) => {
								console.log("SUBMITTING: ", values)
							}}
							render={({ errors, isSubmitting, touched, values }) => {
								console.log("VALS: ", values)
								console.log("ERRS: ", errors)
								return (
									<Form>
										<DialogContent>
											<Typography variant="h6" gutterBottom>
												Contact Form
											</Typography>
											<Grid container spacing={8}>
												<Grid item xs={6}>
													<Input label="Your Name" autocompplete="given-name" />
												</Grid>
												<Grid item xs={6}>
													<Input label="Your Email" autocompplete="email" />
												</Grid>
												<Grid item xs={12}>
													<Input label="Message" multiline rows="5" />
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
													>
														Send
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
