import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";

const styles = {
    root: {
        textAlign: 'center',
        height: "100%",
        width: "100%"
    }
};

class WorkingArea extends Component {
    render() {
        const {classes} = this.props;
        return (<Paper className={classes.root}>Working area</Paper>);
    }
}

export default withStyles(styles)(WorkingArea);