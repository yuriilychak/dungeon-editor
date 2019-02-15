import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#595a5f',
            main: '#3f4045',
            dark: '#2a2b2f',
            contrastText: '#fff',
        }
    },

    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiAppBar: {
            palette: {
                primary: "#2a2b2f",
            },
            root: {
                backgroundColor: "#2a2b2f",
                color: "#ffffff",
                height: "24px",
                minHeight: "24px",
                "@media (min-width: 600px)": {
                    minHeight: "24px"
                },
                boxShadow: "none"
            }
        }

    }
});

export default theme;