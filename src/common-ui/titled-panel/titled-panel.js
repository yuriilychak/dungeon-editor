import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";
import { string, element, arrayOf, oneOfType, shape, number } from "prop-types";

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
        flexGrow : 1,
        fontSize: ".8rem",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark
    },
    titleText: {
        textAlign: "left",
        flexGrow: 1,
        color: theme.palette.primary.contrastText
    }
});

const TitledPanel = ({classes, title, children, titleChildren, bodyPadding}) => (
    <div className={classes.root}>
        <div className={classes.titleContainer}>
            <Typography className={classes.titleText} variant="button">
                {title}
            </Typography>
            {titleChildren}
        </div>
        <div
            className={classes.body}
            style={{
                padding: bodyPadding
            }}
        >
            {children}
        </div>
    </div>
);

TitledPanel.defaultProps = {
    bodyPadding: 0
};

TitledPanel.propTypes = {
    classes: shape({
        body: string.isRequired,
        root: string.isRequired,
        titleContainer: string.isRequired,
        titleText: string.isRequired
    }).isRequired,
    title: string.isRequired,
    bodyPadding: number,
    children: oneOfType([arrayOf(element), element, string]).isRequired,
    titleChildren: oneOfType([arrayOf(element), element, string])
};

export default withStyles(styles)(TitledPanel);
