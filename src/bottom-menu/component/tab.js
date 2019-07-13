import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/core";
import constant from "../constant";

const padding = 2;

const styles = theme => (
    {
        root: {
            height: (constant.TITLE_HEIGHT - padding),
            minHeight: (constant.TITLE_HEIGHT - padding),
            padding: 5,
            minWidth: "100px",
            color: theme.palette.primary.contrastText
        }
    }
);

export default withStyles(styles)(Tab);
