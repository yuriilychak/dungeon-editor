import {withStyles} from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        padding: 0,
        paddingBottom: 8
    }
});

export default withStyles(styles)(MenuList);
