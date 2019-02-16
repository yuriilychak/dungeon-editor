import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.dark
    }
});

export default withStyles(styles)(AppBar);
