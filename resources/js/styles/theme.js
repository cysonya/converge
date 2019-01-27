import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
	  useNextVariants: true,
	},
	palette: {
		primary: {
			main: "#8bc53f"
		}
	}
})

export default theme