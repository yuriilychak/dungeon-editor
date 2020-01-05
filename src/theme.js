import { createMuiTheme } from "@material-ui/core/styles";
import {
    ITEM_SIZE,
    TEXT_COLOR,
    BACKGROUND_COLOR,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    FONT_SIZE, INDENT_SIZE,
    STATE
} from "./constant/ui";
import { getIndent, getBorderStyle } from "./helpers";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: BACKGROUND_COLOR.LIGHT,
            main: BACKGROUND_COLOR.MAIN,
            dark: BACKGROUND_COLOR.DARK,
            contrastText: TEXT_COLOR.CONTRAST
        }
    },

    typography: {
        useNextVariants: true,
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    },
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: INDENT_SIZE.NONE
            }
        },
        MuiTypography: {
            root: {
                userSelect: STATE.NONE
            }
        },
        MuiToolbar: {
            root: {
                overflow: "hidden",
                minHeight: ITEM_SIZE.SMALL
            }
        },
        MuiAppBar: {
            root: {
                backgroundColor: BACKGROUND_COLOR.DARK,
                color: TEXT_COLOR.CONTRAST,
                height: ITEM_SIZE.SMALL,
                minHeight: ITEM_SIZE.SMALL,
                "@media (min-width: 600px)": {
                    minHeight: ITEM_SIZE.SMALL
                },
                boxShadow: STATE.NONE,
            }
        },
        MuiDialog: {
            paper: {
                backgroundColor: BACKGROUND_COLOR.MAIN,
                color: TEXT_COLOR.CONTRAST,
                borderRadius: 0
            }
        },
        MuiDialogTitle: {
            root: {
                padding: getIndent(INDENT_SIZE.L, INDENT_SIZE.XXL),
                "& h6": {
                    color: TEXT_COLOR.CONTRAST
                }
            }
        },
        MuiDialogActions: {
            root: {
                padding: getIndent(INDENT_SIZE.L, INDENT_SIZE.XXL)
            }
        },
        MuiDialogContent: {
            root: {
                padding: getIndent(
                    INDENT_SIZE.L,
                    INDENT_SIZE.XXL,
                    INDENT_SIZE.XXL,
                    INDENT_SIZE.XXL
                )
            }
        },
        MuiInputLabel: {
            root: {
                color: TEXT_COLOR.CONTRAST,
                marginTop: INDENT_SIZE.XS,
                "&$focused": {
                    color: TEXT_COLOR.HOVERED
                }
            }
        },
        MuiInput: {
            root: {
                color: TEXT_COLOR.CONTRAST,
                "&$focused": {
                    color: TEXT_COLOR.HOVERED
                }
            },
            underline: {
                borderBottomColor: TEXT_COLOR.CONTRAST,
                "&:before": {
                    borderBottomColor: TEXT_COLOR.CONTRAST
                },
                "&$focused": {
                    borderBottomColor: TEXT_COLOR.CONTRAST
                },
                "&:hover:not($disabled):before": {
                    backgroundColor: TEXT_COLOR.CONTRAST,
                    borderBottomColor: TEXT_COLOR.CONTRAST,
                    height: 1
                },
                "&:after": {
                    borderBottomColor: TEXT_COLOR.HOVERED
                },
                "&&&&:hover:before": {
                    borderBottomColor: TEXT_COLOR.CONTRAST
                }
            }
        },
        MuiButton: {
            root: {
                borderRadius: INDENT_SIZE.NONE
            },

            contained: {
                color: TEXT_COLOR.CONTRAST,
            },

            containedPrimary: {
                color: TEXT_COLOR.CONTRAST,
                backgroundColor: PRIMARY_COLOR.MAIN,
                borderBottom: getBorderStyle(PRIMARY_COLOR.MAIN_SHADOW, INDENT_SIZE.S),
                boxShadow: STATE.NONE,
                "&:active": {
                    borderBottom: STATE.NONE,
                },
                "&:hover": {
                    backgroundColor: PRIMARY_COLOR.HOVERED,
                    borderBottom: getBorderStyle(PRIMARY_COLOR.HOVERED_SHADOW, INDENT_SIZE.S)
                },
                "&$disabled": {
                    backgroundColor: PRIMARY_COLOR.DISABLED,
                    color: TEXT_COLOR.DISABLED,
                    borderBottom: getBorderStyle(PRIMARY_COLOR.DISABLED_SHADOW, INDENT_SIZE.S)
                }
            },
            containedSecondary: {
                color: TEXT_COLOR.CONTRAST,
                backgroundColor: SECONDARY_COLOR.MAIN,
                borderBottom: getBorderStyle(SECONDARY_COLOR.MAIN_SHADOW, INDENT_SIZE.S),
                boxShadow: STATE.NONE,
                "&:active": {
                    borderBottom: STATE.NONE,
                },
                "&:hover": {
                    backgroundColor: SECONDARY_COLOR.HOVERED,
                    borderBottom: getBorderStyle(SECONDARY_COLOR.HOVERED_SHADOW, INDENT_SIZE.S)
                },
                "&$disabled": {
                    backgroundColor: SECONDARY_COLOR.DISABLED,
                    color: TEXT_COLOR.DISABLED,
                    borderBottom: getBorderStyle(SECONDARY_COLOR.DISABLED_SHADOW, INDENT_SIZE.S),
                }
            }
        },
        MuiDialogContentText: {
            root: {
                color: TEXT_COLOR.CONTRAST
            }
        },
        MuiLinearProgress: {
            root: {
                margin: getIndent(INDENT_SIZE.L, INDENT_SIZE.NONE),
            },
            barColorPrimary: {
                backgroundColor: PRIMARY_COLOR.MAIN,
            },
            barColorSecondary: {
                backgroundColor: SECONDARY_COLOR.MAIN,
            },
        },
        MuiExpansionPanel: {
            root: {
                color: TEXT_COLOR.CONTRAST,
                fontSize: FONT_SIZE.MEDIUM,
                minHeight: ITEM_SIZE.MEDIUM,
                backgroundColor: BACKGROUND_COLOR.DARK,
                borderBottom: getBorderStyle(BACKGROUND_COLOR.LIGHT, INDENT_SIZE.XS),
                borderRadius: INDENT_SIZE.NONE,
                "&$expanded": {
                    margin: INDENT_SIZE.NONE
                }
            }
        },
        MuiExpansionPanelSummary: {
            root: {
                padding: getIndent(INDENT_SIZE.NONE, INDENT_SIZE.XL),
                minHeight: ITEM_SIZE.MEDIUM,
                "&$expanded": {
                    borderBottom: getBorderStyle(BACKGROUND_COLOR.LIGHT, INDENT_SIZE.XS, "dashed"),
                    minHeight: ITEM_SIZE.MEDIUM,
                }
            },
            content: {
                margin: getIndent(INDENT_SIZE.S, INDENT_SIZE.NONE),
                "&$expanded": {
                    margin: getIndent(INDENT_SIZE.S, INDENT_SIZE.NONE)
                }
            },
            expandIcon: {
                padding: INDENT_SIZE.XS,
                color: TEXT_COLOR.CONTRAST
            }
        },
        MuiExpansionPanelDetails: {
            root: {
                padding: getIndent(INDENT_SIZE.M, INDENT_SIZE.NONE),
                flexDirection: "column"
            }
        },
        MuiTooltip: {
            tooltip: {
                color: TEXT_COLOR.CONTRAST,
                backgroundColor: TEXT_COLOR.HOVERED,
                borderRadius: INDENT_SIZE.NONE
            }
        },
        MuiSvgIcon: {
            root: {
                fontSize: FONT_SIZE.MEDIUM,
                fill: TEXT_COLOR.CONTRAST
            }
        },
        MuiSelect: {
            icon: {
                width: ITEM_SIZE.SMALL,
                height: ITEM_SIZE.SMALL
            }
        },
        MuiIconButton: {
            root: {
                padding: INDENT_SIZE.XS,

            },
            label: {
                color: TEXT_COLOR.CONTRAST,
                fontSize: FONT_SIZE.MEDIUM
            }
        },
        MuiFormControl: {
            root: {
                width: "100%"
            }
        },
        MuiFormControlLabel: {
            root: {
                height: 18,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
            },
            label: {
                height: 18,
                color: TEXT_COLOR.CONTRAST,
                fontSize: FONT_SIZE.MEDIUM,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
            }
        },
        MuiSlider: {
            root: {
                margin: getIndent(INDENT_SIZE.NONE, INDENT_SIZE.XL),
                padding: getIndent(INDENT_SIZE.L, INDENT_SIZE.NONE)
            },
            marked: {
                marginBottom: INDENT_SIZE.L
            },
            track: {
                backgroundColor: SECONDARY_COLOR.MAIN
            },
            rail: {
                backgroundColor: SECONDARY_COLOR.HOVERED
            },
            markLabel: {
                top: 14,
                fontSize: FONT_SIZE.SMALL,
                color: TEXT_COLOR.DISABLED
            },
            markLabelActive: {
                color: TEXT_COLOR.CONTRAST
            },
            mark: {
                backgroundColor: BACKGROUND_COLOR.DARK
            },
            markActive: {
                backgroundColor: BACKGROUND_COLOR.DARK
            },
            thumb: {
                backgroundColor: BACKGROUND_COLOR.LIGHT
            },
            valueLabel: {
                fontSize: FONT_SIZE.SMALL
            }
        },
        MuiList: {
            root: {
                borderRadius: INDENT_SIZE.NONE,
                backgroundColor: BACKGROUND_COLOR.LIGHT,
                color: TEXT_COLOR.CONTRAST
            }
        },
        MuiCheckbox: {
            root: {
                padding: "0 9px 0 0"
            }
        }
    }
});

export default theme;
