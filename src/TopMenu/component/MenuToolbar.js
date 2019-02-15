import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import uiConst from "../../const/uiConst";

const padding = 8;

const MenuToolbar = withStyles({
    root: {
        paddingLeft: padding + "px",
        paddingRight: padding + "px",
        height: uiConst.TOP_MENU_SIZE + "px",
        minHeight: uiConst.TOP_MENU_SIZE + "px",
        "@media (min-width: 600px)": {
            minHeight: uiConst.TOP_MENU_SIZE + "px"
        }
    }
})(Toolbar);

export default MenuToolbar;