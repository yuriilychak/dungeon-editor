import {withStyles} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const height = 18;
const minWidth = 64;

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        padding: "2px 8px",
        height: height,
        minHeight: height,
        minWidth: minWidth,
        color: theme.palette.primary.contrastText,
        fontSize: "0.7rem",
        fontFamily: theme.typography.fontFamily
    }
});

export default withStyles(styles)(MenuItem);
