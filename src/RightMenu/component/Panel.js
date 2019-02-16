import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: "100%",
        height: "50%"
    },
    title: {
        width: "100%",
        backgroundColor: theme.palette.primary.main
    },
    typography: {
        color: theme.palette.primary.contrastText
    }
});

const Panel = props => {
    const {classes, title, children} = props;
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography className={classes.typography} variant="button" gutterBottom>
                    {title}
                </Typography>
            </div>
            {children}
        </div>
    );
};

export default withStyles(styles)(Panel);
