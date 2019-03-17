import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import SettingsIcon from "@material-ui/icons/Settings"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import React from "react"
import ReactDOM from "react-dom"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"

import { CardHeading, CardContent, CardFooter, styles } from "./components"

const PackagePrice = styled.h6`
	margin: 0;
	font-size: 14px;
	font-weight: normal;
	color: #fff;
`
const StatsBox = styled.div`
	display: flex;
	justify-content: space-around;
`
const StatsSection = styled.div`
	position: relative;
	padding: 0 8px;
	width: 50%;
	&:after {
		position: absolute;
		top: 50%;
		right: 0;
		content: "";
		width: 1px;
		height: 75%;
		transform: translateY(-50%);
		background-color: ${props => props.theme.grey[300]};
	}
	&:last-child:after {
		display: none;
	}
`
const InternalPackages = ({ classes, eventPackages }) => {
	return (
		<div className="p-10">
			<Grid container spacing={24}>
				{!!eventPackages &&
					eventPackages.map((pkg, index) => (
						<Grid key={index} item xs={12} md={6} lg={4}>
							<Paper className={classes.paper}>
								<CardHeading>
									<Typography className={classes.cardTitle} variant="h6">
										{pkg.title}
									</Typography>
									<PackagePrice>${pkg.price}</PackagePrice>
								</CardHeading>

								<CardContent>
									<StatsBox>
										<StatsSection>
											<Typography
												className={`${classes.statsVal} ${
													classes.statsValSmall
												}`}
												variant="subtitle2"
											>
												{pkg.quantity_sold}
											</Typography>
											<Typography
												className={classes.statsLabel}
												variant="body1"
											>
												Sold
											</Typography>
										</StatsSection>
										<StatsSection>
											<Typography
												className={`${classes.statsVal} ${
													classes.statsValSmall
												}`}
												variant="subtitle2"
											>
												{pkg.quantity_remaining}
											</Typography>
											<Typography
												className={classes.statsLabel}
												variant="body1"
											>
												Remaining
											</Typography>
										</StatsSection>
									</StatsBox>
								</CardContent>

								<CardFooter>
									<Link
										component={NavLink}
										className={classes.footerLink}
										to={`/admin/package/${pkg.id}/edit`}
									>
										<SettingsIcon className="mr-5" fontSize="inherit" /> Edit
									</Link>
								</CardFooter>
							</Paper>
						</Grid>
					))}
			</Grid>
		</div>
	)
}

InternalPackages.propTypes = {}

const mapStateToProps = (state, ownProps) => {
	return {
		eventPackages: state.dashboard.packages
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const Packages = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalPackages)

export default withStyles(styles)(Packages)
