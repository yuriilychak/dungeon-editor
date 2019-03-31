import { createMuiTheme } from '@material-ui/core/styles';
import uiConst from "./const/uiConst";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#595a5f',
            main: '#3f4045',
            dark: '#2a2b2f',
            contrastText: "#ffffff"
        }
    },

    typography: {
        useNextVariants: true,
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    },
    overrides: {
        MuiAppBar: {
            root: {
                backgroundColor: "#2a2b2f",
                color: "#ffffff",
                height: uiConst.TOP_MENU_HEIGHT + "px",
                minHeight: uiConst.TOP_MENU_HEIGHT + "px",
                "@media (min-width: 600px)": {
                    minHeight: uiConst.TOP_MENU_HEIGHT + "px"
                },
                boxShadow: "none",
            }
        },
        MuiDialog: {
            paper: {
                backgroundColor: "#3f4045",
                color: "#ffffff",
                borderRadius: 0
            }
        },
        MuiDialogTitle: {
            root: {
                color: "#ffffff"
            }
        }
    }
});

export default theme;
