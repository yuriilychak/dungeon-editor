import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        padding: 0
    }
});

export default withStyles(styles)(Paper);
