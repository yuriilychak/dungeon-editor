import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import uiConst from "../../constant/uiConst";

const padding = 8;

export default withStyles({
    root: {
        paddingLeft: padding + "px",
        paddingRight: padding + "px",
        height: uiConst.TOP_MENU_HEIGHT + "px",
        minHeight: uiConst.TOP_MENU_HEIGHT + "px",
        "@media (min-width: 600px)": {
            minHeight: uiConst.TOP_MENU_HEIGHT + "px"
        }
    }
})(Toolbar);
