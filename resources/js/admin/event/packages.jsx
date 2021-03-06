import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import PauseIcon from "@material-ui/icons/Pause"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
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
import { updatePackage } from "@/admin-store/actions"

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
const ToggleStatus = styled(Button)`
	&& {
		color: #fff;
		font-size: 10px;
		font-style: italic;
		line-height: 1;
		text-transform: none;
		svg {
			font-size: 14px;
		}
	}
`
const InternalPackages = ({ classes, eventPackages, toggleStatus }) => {
	return (
		<div className="p-10">
			<Grid container spacing={24}>
				{!!eventPackages &&
					eventPackages.map((pkg, index) => (
						<Grid
							key={index}
							item
							xs={12}
							md={6}
							lg={4}
							className={classes.gridItem}
						>
							<Paper className={classes.paper}>
								<CardHeading padding="5px 10px">
									<Typography className={classes.cardTitle} variant="h6">
										{pkg.title}
									</Typography>
									{pkg.is_paused ? (
										<ToggleStatus
											size="small"
											onClick={() => toggleStatus(pkg)}
										>
											<PlayArrowIcon className="mr-5" fontSize="inherit" />
											Resume Sale
										</ToggleStatus>
									) : (
										<ToggleStatus
											size="small"
											onClick={() => toggleStatus(pkg)}
										>
											<PauseIcon className="mr-5" fontSize="inherit" /> Pause
											Sale
										</ToggleStatus>
									)}
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
												{pkg.quantity_remaining === 9999 ? (
													<span>&infin;</span>
												) : (
													pkg.quantity_remaining
												)}
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
										to={`/admin/events/${pkg.event_id}/packages/${pkg.id}/edit`}
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
	return {
		toggleStatus: pkg => {
			if (
				confirm(
					`Are you sure you want to ${
						pkg.is_paused ? "resume" : "pause"
					} the sale for ${pkg.title}?`
				)
			) {
				pkg = Object.assign({}, pkg, { is_paused: !pkg.is_paused })
				dispatch(updatePackage(pkg))
			}
		}
	}
}

const Packages = connect(
	mapStateToProps,
	mapDispatchToProps
)(InternalPackages)

export default withStyles(styles)(Packages)
