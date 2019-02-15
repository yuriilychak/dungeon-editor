import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";

const padding = 8;

const MenuToolbar = withStyles({
    root: {
        paddingLeft: padding + "px",
        paddingRight: padding + "px",
        height: "24px",
        minHeight: "24px",
        "@media (min-width: 600px)": {
            minHeight: "24px"
        }
    }
})(Toolbar);

export default MenuToolbar;