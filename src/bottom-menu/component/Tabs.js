import Tabs from '@material-ui/core/Tabs';
import {withStyles} from "@material-ui/core";
import constant from "../constant";

const styles = {
    root: {
        minHeight: constant.TITLE_HEIGHT,
        height: constant.TITLE_HEIGHT
    }
}

export default withStyles(styles)(Tabs);
