import React from 'react'
import styled from 'styled-components'

export const styles = theme => ({
	inputLabel: {
		fontSize: "14px",
		[theme.breakpoints.up('md')]: {
			fontSize: "16px"
		}
	},
	input: {
		borderRadius: "4px",
		backgroundColor: theme.palette.grey[200]
	}
})

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
		border: 1px solid rgba(0,0,0,.12);
		border-radius: 3px;
	`
	return (
		<Line>
			<Text>{props.text}</Text>
		</Line>
	)
}