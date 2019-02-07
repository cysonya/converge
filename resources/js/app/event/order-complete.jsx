import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon
} from "react-share"
import styled from "styled-components"

const CheckArea = styled.div`
	padding: 25px 20px;
	text-align: center;
	background-color: ${props => props.theme.primary.main};
`
const CheckIcon = styled(CheckCircleIcon)`
	&& {
		margin-bottom: 8px;
		color: #fff;
		font-size: 50px;
	}
`
const Content = styled.div`
	padding: 20px;
	text-align: center;
`
const ShareArea = styled.div`
	margin-bottom: 20px;
	text-align: left;
`
const ShareGroup = styled.div`
	display: flex;
	> div {
		margin-right: 16px;
		cursor: pointer;
		:focus {
			outline: none;
		}
	}
`
const Divider = styled.div`
	height: 1px;
	width: 100px;
	margin: 20px auto;
	background-color: ${props => props.theme.grey[600]};
`
const styles = theme => ({
	check: {
		color: "#FFF",
		fontSize: "50px"
	},
	thanks: {
		color: "#FFF"
	}
})
const InternalOrderComplete = ({ classes, event, order }) => {
	return (
		<div>
			<CheckArea>
				<CheckCircleIcon className={classes.check} />
				<Typography className={classes.thanks} variant="h4">
					THANK YOU!
				</Typography>
			</CheckArea>
			<Content>
				<Typography variant="subtitle2" className="mb-20">
					Thank you for registering for {event.title} ({event.date_range}), held
					at Hiram College:
				</Typography>

				<Typography variant="body1">
					11715 Garfield Road
					<br />
					Hiram, Ohio 44234
				</Typography>

				<Divider />

				<Typography className="text-left" variant="body2" gutterBottom>
					Registration is from 3-5pm at ???. This is when you will receive your
					housing information and a schedule for the weekend.
				</Typography>
				<Typography className="text-left mb-20" variant="body2" gutterBottom>
					If you have any comments or questions, please email Jerry Wierwille at
					jerry@lhim.org.
				</Typography>

				<ShareArea>
					<Typography variant="subtitle2" gutterBottom>
						Tell your friends you're coming to Converge
					</Typography>
					<ShareGroup>
						<FacebookShareButton
							quote={event.social_share_text}
							url="https://convergefest.com"
						>
							<FacebookIcon size={42} />
						</FacebookShareButton>
						<TwitterShareButton
							title={event.social_share_text}
							url="https://convergefest.com"
						>
							<TwitterIcon size={42} />
						</TwitterShareButton>
					</ShareGroup>
				</ShareArea>
			</Content>
		</div>
	)
}

InternalOrderComplete.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		event: state.event,
		order: state.order.data
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const OrderComplete = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalOrderComplete)

export default withStyles(styles)(OrderComplete)
