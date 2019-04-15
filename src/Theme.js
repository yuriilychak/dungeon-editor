import { createMuiTheme } from '@material-ui/core/styles';
import uiConst from "./constant/uiConst";

const contrastText = "#ffffff";
const disabledText = "#bbbbbb";
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
        MuiTypography: {
            root: {
                userSelect: "none"
            }
        },
        MuiAppBar: {
            root: {
                backgroundColor: "#2a2b2f",
                color: contrastText,
                height: uiConst.TOP_MENU_HEIGHT,
                minHeight: uiConst.TOP_MENU_HEIGHT,
                "@media (min-width: 600px)": {
                    minHeight: uiConst.TOP_MENU_HEIGHT
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
                '& h6': {
                    color: contrastText
                }
            }
        },
        MuiInputLabel: {
            root: {
                color: contrastText,
                marginTop: 2,
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
        },
        MuiButton: {
            root: {
                borderRadius: 0
            },

            contained: {
                color: contrastText,
            },

            containedPrimary: {
                color: contrastText,
                backgroundColor: "#1d9cf9",
                borderBottom: "4px solid #004995",
                boxShadow: "none",
                '&:active': {
                    borderBottom: "none",
                },
                '&:hover': {
                    backgroundColor: "#0575c6",
                },
                '&$disabled': {
                    backgroundColor: "#1c8ab1",
                    color: disabledText,
                    borderBottom: "4px solid #1C5375",
                }
            },
            containedSecondary: {
                color: contrastText,
                backgroundColor: "#f4385b",
                borderBottom: "4px solid #801227",
                boxShadow: "none",
                '&:active': {
                    borderBottom: "none",
                },
                '&:hover': {
                    backgroundColor: "#a52941",
                },
                '&$disabled': {
                    backgroundColor: "#a53c4c",
                    color: disabledText,
                    borderBottom: "4px solid #79273A",
                }
            }
        },
        MuiDialogContentText: {
            root: {
                color: contrastText
            }
        },
        MuiLinearProgress: {
            root: {
                margin: "8px 0",
            },
            barColorPrimary: {
                backgroundColor: "#1d9cf9",
            },
            barColorSecondary: {
                backgroundColor: "#f4385b",
            },
        }
    }
});

export default theme;
