import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import Slide from "@material-ui/core/Slide"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import { Field, getIn } from "formik"
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"
import {
	CardElement,
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	PostalCodeElement
} from "react-stripe-elements"

import { inputError } from "@/app/components/form/index"
import { getOrderTotal } from "@/app/helpers"
import { isMobile } from "@/helpers/application"

import { styles } from "./components"
import OrderSummary from "./order-summary"

const PaymentContainer = styled.div`
	padding: 10px;
	background-color: ${props => props.theme.grey[200]};
	border: 1px solid ${props => props.theme.grey[300]};
`
const FormControl = styled.div`
	margin-bottom: 12px;
`
const FormLabel = styled.div`
	margin-bottom: 5px;
	padding-left: 4px;
	font-size: 14px;
`
const ErrorText = styled.div`
	margin: 8px 12px 0;
	font-size: 0.75rem;
	line-height: 1em;
	color: ${props => props.theme.error.main};
`
const NameInput = styled.input`
	background-color: white;
	height: 40px;
	width: 100%;
	padding: 10px 12px;
	border-radius: 4px;
	border: 1px solid transparent;
	box-shadow: 0 1px 3px 0 #e6ebf1;
	&:focus {
		outline: none;
		border-color: ${props => props.theme.primary.main};
	}
	${props =>
		props.error &&
		`
		border-color: ${props => props.theme.error.main};
	`}
`
const Modal = styled(Dialog)`
	&& {
		width: 80%;
		max-width: 400px;
	}
`
const ModalContent = styled(DialogContent)`
	&& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`

function Transition(props) {
	return <Slide direction="down" {...props} />
}
function Processing() {
	return (
		<ModalContent>
			<CircularProgress color="secondary" style={{ marginBottom: "10px" }} />
			<Typography variant="subtitle2">Processing...</Typography>
		</ModalContent>
	)
}

const InternalPaymentForm = ({
	classes,
	doChange,
	doBlur,
	formProps,
	orderTotal,
	status,
	width
}) => {
	return (
		<div>
			<Grid
				container
				spacing={isMobile(width) ? 16 : 40}
				justify="space-between"
				style={{ marginBottom: "10px" }}
			>
				<Grid
					item
					xs={12}
					md={5}
					style={isMobile(width) ? { marginTop: "10px" } : { order: 2 }}
				>
					<OrderSummary formProps={formProps} />
				</Grid>

				<Grid item xs={12} md={7} style={isMobile(width) ? {} : { order: 1 }}>
					<PaymentContainer>
						{orderTotal !== 0 && (
							<div>
								<Field
									name="payment.cardNumber"
									render={({ form }) => (
										<FormControl>
											<FormLabel>Card Number</FormLabel>
											<CardNumberElement
												onChange={e => doChange(e)}
												onBlur={e => doBlur(e)}
											/>
											{!!inputError(form, "payment.cardNumber") && (
												<ErrorText>
													{formProps.errors.payment.cardNumber}
												</ErrorText>
											)}
										</FormControl>
									)}
								/>
								<Field
									name="payment.cardExpiry"
									render={({ form }) => (
										<FormControl>
											<FormLabel>Expiry</FormLabel>
											<CardExpiryElement
												onChange={e => doChange(e)}
												onBlur={e => doBlur(e)}
											/>
											{!!inputError(form, "payment.cardExpiry") && (
												<ErrorText>
													{formProps.errors.payment.cardExpiry}
												</ErrorText>
											)}
										</FormControl>
									)}
								/>
								<Field
									name="payment.cardCvc"
									render={({ form }) => (
										<FormControl>
											<FormLabel>Secure Code</FormLabel>
											<CardCVCElement
												onChange={e => doChange(e)}
												onBlur={e => doBlur(e)}
											/>
											{!!inputError(form, "payment.cardCvc") && (
												<ErrorText>
													{formProps.errors.payment.cardCvc}
												</ErrorText>
											)}
										</FormControl>
									)}
								/>
								<Field
									name="payment.postalCode"
									render={({ form }) => (
										<FormControl>
											<FormLabel>Zip</FormLabel>
											<PostalCodeElement
												onChange={e => doChange(e)}
												onBlur={e => doBlur(e)}
											/>
											{!!inputError(form, "payment.postalCode") && (
												<ErrorText>
													{formProps.errors.payment.postalCode}
												</ErrorText>
											)}
										</FormControl>
									)}
								/>
							</div>
						)}

						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={!formProps.isValid || formProps.isSubmitting}
							fullWidth
						>
							PLACE ORDER
						</Button>
					</PaymentContainer>
				</Grid>
			</Grid>

			<Dialog
				open={status === "processing"}
				TransitionComponent={Transition}
				fullWidth
				maxWidth="xs"
				keepMounted
				aria-labelledby="processing payment"
				aria-describedby="processing payment"
			>
				<Processing />
			</Dialog>
		</div>
	)
}

InternalPaymentForm.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		orderTotal: getOrderTotal(state, ownProps),
		status: state.order.status
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { setFieldValue, setFieldTouched } = ownProps.formProps
	return {
		doChange: e => {
			if (typeof e.error !== "undefined") {
				setFieldValue(`payment.${e.elementType}`, e.error.message, true)
			} else if (e.complete) {
				setFieldValue(`payment.${e.elementType}`, "complete", true)
			}
		},
		doBlur: e => {
			setFieldTouched(`payment.${e.elementType}`, true, false)
		}
	}
}

const PaymentForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalPaymentForm)))

export default PaymentForm
