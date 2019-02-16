import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import Tabs from './Tabs';
import Tab from './Tab';
import constant from "../constant";

const styles = theme => ({
    root: {
        textAlign: 'center',
        height: "100%",
        width: "100%",
        boxShadow: "none",
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "0"
    },
    title: {
        textAlign: "left",
        width: "100%",
        height: constant.TITLE_HEIGHT,
        backgroundColor: theme.palette.primary.main
    }
});

class BottomMenu extends Component {
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const {classes} = this.props;
        const { value } = this.state;
        return (
            <Paper className={classes.root}>
                <div className={classes.title}>
                    <Tabs value={value} className={classes.tabGroup} onChange={this.handleChange}>
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </div>
                Bottom menu
            </Paper>
        );
    }
}

export default withStyles(styles)(BottomMenu);
