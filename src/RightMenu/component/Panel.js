import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: "100%",
        height: "50%",
        display: "flex",
        flexFlow: "column"
    },
    titleContainer: {
        width: "calc(100% - 20px)",
        padding: "0 10px",
        display: "flex",
        flexFlow: "row",
        backgroundColor: theme.palette.primary.main
    },
    body: {
        flexGrow : 1
    },
    titleText: {
        textAlign: "left",
        flexGrow: 1,
        color: theme.palette.primary.contrastText
    }
});

const Panel = ({classes, title, children, titleContent}) => (
    <div className={classes.root}>
        <div className={classes.titleContainer}>
            <Typography className={classes.titleText} variant="button">
                {title}
            </Typography>
            {titleContent}
        </div>
        <div className={classes.body}>
            {children}
        </div>
    </div>
);

export default withStyles(styles)(Panel);
