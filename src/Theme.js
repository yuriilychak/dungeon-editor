import { createMuiTheme } from '@material-ui/core/styles';
import uiConst from "./const/uiConst";

const contrastText = "#ffffff";
const hoverText = "#1d9cf9";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#595a5f',
            main: '#3f4045',
            dark: '#2a2b2f',
            contrastText: contrastText
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
                color: contrastText,
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
                color: contrastText,
                borderRadius: 0
            }
        },
        MuiDialogTitle: {
            root: {
                color: contrastText
            }
        },
        MuiInputLabel: {
            root: {
                color: contrastText,
                marginTop: 2
            },

            focused: {
                "&$focused": {
                    color: hoverText
                }
            }
        },
        MuiInput: {
            root: {
                color: contrastText,
                "&$focused": {
                    color: hoverText
                }
            },
            underline: {
                borderBottomColor: contrastText,
                "&:before": {
                    borderBottomColor: contrastText
                },
                "&$focused": {
                    borderBottomColor: contrastText
                },
                "&:hover:not($disabled):before": {
                    backgroundColor: contrastText,
                    borderBottomColor: contrastText,
                    height: 1
                },
                "&:after": {
                    borderBottomColor: hoverText
                },
                "&&&&:hover:before": {
                    borderBottomColor: contrastText
                }
            }
        }
    }
});

export default theme;
