import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { getRandomColor, isMobile } from "@/helpers/application"
import { media } from "@/styles/utils"
import { Divider, styles } from "./components"

// const Packages = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	flex-wrap: wrap;
// `
// const Packagewrapper = styled.div`
// 	padding: 4px;
// 	flex-basis: 100%;
// 	${media.md`
// 		flex-basis: 33%;
// 	`}
// `
// const Package = styled.div`
// 	position: relative;
// 	display: flex;
// 	padding: 8px;
// 	background-color: ${props => props.theme.grey[100]};
// 	border: 2px solid
// 		${props => (props.selected ? props.theme.primary.light : "transparent")};
// 	border-radius: 4px;
// `
// const Check = styled(CheckCircleIcon)`
// 	position: absolute;
// 	top: -11px;
// 	right: -10px;
// 	color: ${props => props.theme.primary.main};
// 	background-color: white;
// 	border-radius: 50%;
// `
const InternalHousingForm = ({ classes, width }) => {
	return (
		<div>
			<Card className={classes.card} style={{ borderColor: getRandomColor() }}>
				<Typography variant="h6" className={classes.cardName}>
					Your Information
				</Typography>

				<Grid container spacing={8} style={{ marginBottom: "10px" }}>
					<Grid item xs={12} md={6}>
						<TextField
							label="Roommate preference"
							variant={isMobile(width) ? "standard" : "outlined"}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: isMobile(width) ? "" : classes.input
							}}
							margin="dense"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Dietary restrictions"
							variant={isMobile(width) ? "standard" : "outlined"}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: isMobile(width) ? "" : classes.input
							}}
							margin="dense"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Housing option"
							variant={isMobile(width) ? "standard" : "outlined"}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							InputProps={{
								className: isMobile(width) ? "" : classes.input
							}}
							margin="dense"
							value=""
							fullWidth
							select
						>
							<option value="" />
							<option value="1">Bowler Hall - $150</option>
							<option value="2">East Hall - $120</option>
							<option value="3">Dorm (no AC) - $80</option>
						</TextField>
					</Grid>
				</Grid>
				{/* TODO: delete if not going to use */}
				{false && (
					<Packages>
						<Packagewrapper>
							<Package selected>
								{true && <Check />}
								<Grid item xs>
									<Typography
										variant="subtitle2"
										className={classes.lineHeight}
									>
										Bowler Hall
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1" color="primary">
										$19.00
									</Typography>
								</Grid>
							</Package>
						</Packagewrapper>

						<Packagewrapper>
							<Package>
								<Grid item xs>
									<Typography variant="subtitle2">East Hall</Typography>
								</Grid>
								<Grid item>
									<Typography
										variant="subtitle1"
										className={classes.lineHeight}
										color="primary"
									>
										$19.00
									</Typography>
								</Grid>
							</Package>
						</Packagewrapper>
					</Packages>
				)}
			</Card>
		</div>
	)
}

InternalHousingForm.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const HousingForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withWidth()(InternalHousingForm)))

export default HousingForm
