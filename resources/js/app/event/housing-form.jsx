import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
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
import { Divider, styles } from "./components"

const EventPackage = styled(Grid)`
	background-color: ${props => props.theme.grey[100]};
	border: 2px solid
		${props => (props.selected ? props.theme.primary.light : "transparent")};
	border-radius: 4px;
`
const InternalHousingForm = ({ classes, width }) => {
	return (
		<div>
			<Card className={classes.card} style={{ borderColor: getRandomColor() }}>
				<Typography variant="h6" className={classes.cardName}>
					Your Information
				</Typography>

				<Grid container spacing={8} style={{ marginBottom: "20px" }}>
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
				</Grid>

				<Grid container spacing={24}>
					<Grid item xs={12} md={6}>
						<EventPackage selected container spacing={16}>
							<Grid item xs>
								<Typography variant="subtitle2" className={classes.lineHeight}>
									Bowler Hall
								</Typography>
								<Typography variant="body2">
									Blah blah blah something about Bowler hall...
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1" color="primary">
									$19.00
								</Typography>
							</Grid>
						</EventPackage>
					</Grid>

					<Grid item xs={12} md={6}>
						<EventPackage container spacing={16}>
							<Grid item xs>
								<Typography variant="subtitle2">Bowler Hall</Typography>
								<Typography variant="body2">
									Blah blah blah something about Bowler hall...
								</Typography>
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
						</EventPackage>
					</Grid>
				</Grid>
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
