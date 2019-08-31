import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/core";

import { INDENT_SIZE, ITEM_SIZE, TEXT_COLOR } from "../../constant";

const styles = {
        root: {
            height: (ITEM_SIZE.MEDIUM - INDENT_SIZE.XS),
            minHeight: (ITEM_SIZE.MEDIUM - INDENT_SIZE.XS),
            padding: INDENT_SIZE.M,
            minWidth: ITEM_SIZE.HUGE,
            color: TEXT_COLOR.CONTRAST
        }
};

export default withStyles(styles)(Tab);
