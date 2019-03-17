import styled from "styled-components"

export const CardHeading = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: ${props => props.theme.common.background};
`
export const CardContent = styled.div`
	padding: 20px;
	text-align: center;
`
export const CardFooter = styled.div`
	padding: 10px;
	text-align: center;
	border-top: 1px solid ${props => props.theme.grey[300]};
	background-color: ${props => props.theme.grey[200]};
`
export const styles = theme => ({
	cardTitle: {
		fontSize: "16px",
		color: "#fff"
	},
	eventTitle: {
		marginLeft: "55px",
		color: "#fff"
	},
	paper: {
		borderRadius: "0"
	},
	statsVal: {
		fontSize: "32px",
		lineHeight: "1.2",
		color: theme.palette.primary.main
	},
	statsLabel: {
		fontSize: "14px",
		color: theme.palette.grey[600]
	},
	statsValSmall: {
		fontSize: "24px"
	},
	footerLink: {
		display: "inline-flex",
		alignItems: "center",
		color: theme.palette.common.background,
		"&:hover": {
			color: theme.palette.primary.main,
			textDecoration: "none"
		}
	}
})
