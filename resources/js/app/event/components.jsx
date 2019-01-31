import React from "react"
import styled from "styled-components"

export const styles = theme => ({
	inputLabel: {
		fontSize: "14px",
		[theme.breakpoints.up("md")]: {
			fontSize: "16px"
		}
	},
	input: {
		borderRadius: "4px",
		backgroundColor: "#fff"
	},
	card: {
		marginBottom: "20px",
		padding: "10px 10px 15px",
		borderLeft: "4px solid",
		[theme.breakpoints.up("md")]: {
			padding: "10px 15px 15px",
			borderWidth: "5px"
		}
	},
	cardName: {
		fontSize: "14px",
		[theme.breakpoints.up("md")]: {
			fontSize: "16px"
		}
	},
	lineHeight: {
		lineHeight: "1.5"
	},
	summaryWrapper: {
		marginBottom: "20px",
		padding: "0 10px 10px"
	},
	alignRight: {
		paddingRight: "10px !important",
		textAlign: "right"
	},
	alignLeft: {
		paddingLeft: "10px"
	},
	divider: {
		margin: "10px 0"
	},
	donateInput: {
		width: "130px"
	},
	stepper: {
		padding: "24px 10px",
		backgroundColor: "transparent",
		[theme.breakpoints.up("md")]: {
			padding: "24px"
		}
	},
	stepContent: {
		paddingLeft: "10px",
		paddingRight: "0"
	}
})

export const TotalAmount = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
`

export const Divider = props => {
	const Line = styled.div`
		margin: ${props => props.margin || "20px 0 30px;"}
		height: 0;
		text-align: center;
		border-top: 1px solid rgba(0,0,0,.12);
	`

	const Text = styled.span`
		position: relative;
		top: -9px;
		padding: 2px 15px;
		font-size: 16px;
		color: ${props => props.theme.primary.main};
		background-color: white;
		border: 1px solid rgba(0, 0, 0, 0.12);
		border-radius: 3px;
	`
	return (
		<Line>
			<Text>{props.text}</Text>
		</Line>
	)
}
