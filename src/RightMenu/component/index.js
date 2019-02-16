import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import Panel from "./Panel";

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

class RightMenu extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <Panel title={"Properties"}>body</Panel>
                <Panel title={"Library"}>body</Panel>
            </Paper>
        );
    }
}

export default withStyles(styles)(RightMenu);
