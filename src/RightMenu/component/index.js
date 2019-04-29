import React from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import Panel from "./Panel";
import ConLibrary from "../../Library/container";

const styles = theme => ({
    root: {
        textAlign: 'center',
        height: "100%",
        width: "100%",
        boxShadow: "none",
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "0"
    }
});

const RightMenu = props => {
    const {classes} = props;
    return (
        <Paper className={classes.root}>
            <Panel title={"Properties"}>body</Panel>
            <Panel title={"Library"}>
                <ConLibrary/>
            </Panel>
        </Paper>
    );
};

export default withStyles(styles)(RightMenu);
