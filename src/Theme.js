import { createMuiTheme } from '@material-ui/core/styles';
import uiConst from "./const/uiConst";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#595a5f',
            main: '#3f4045',
            dark: '#2a2b2f',
            contrastText: "#fffff"
        }
    },

    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiAppBar: {
            root: {
                backgroundColor: "#2a2b2f",
                color: "#ffffff",
                height: uiConst.TOP_MENU_SIZE + "px",
                minHeight: uiConst.TOP_MENU_SIZE + "px",
                "@media (min-width: 600px)": {
                    minHeight: uiConst.TOP_MENU_SIZE + "px"
                },
                boxShadow: "none"
            }
        }

    }
});

export default theme;