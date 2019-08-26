import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import { ITEM_SIZE, INDENT_SIZE } from "../../constant/ui";

export default withStyles({
    root: {
        paddingLeft: INDENT_SIZE.L,
        paddingRight: INDENT_SIZE.L,
        height: ITEM_SIZE.SMALL,
        minHeight: ITEM_SIZE.SMALL,
        zIndex: 1,
        "@media (min-width: 600px)": {
            minHeight: ITEM_SIZE.SMALL
        }
    }
})(Toolbar);
