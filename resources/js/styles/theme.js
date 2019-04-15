import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 355,
			md: 768,
			lg: 1020,
			xl: 1200
		}
	},
	typography: {
		useNextVariants: true
	},
	palette: {
		primary: {
			main: "#8bc53f"
		},
		secondary: {
			main: "#ffce55"
		},
		common: {
			background: "#2f3558"
		}
	}
})

export default theme
