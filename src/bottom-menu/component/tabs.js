import Tabs from '@material-ui/core/Tabs';
import {withStyles} from "@material-ui/core";

import {ITEM_SIZE} from "../../constant";

const styles = {
    root: {
        minHeight: ITEM_SIZE.MEDIUM,
        height: ITEM_SIZE.MEDIUM
    }
}

export default withStyles(styles)(Tabs);
