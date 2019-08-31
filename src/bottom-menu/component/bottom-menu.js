import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import Tabs from './tabs';
import Tab from './tab';

import { BACKGROUND_COLOR, ITEM_SIZE } from "../../constant";

const styles = {
    root: {
        textAlign: 'center',
        height: "100%",
        width: "100%",
        boxShadow: "none",
        backgroundColor: BACKGROUND_COLOR.DARK,
        borderRadius: "0"
    },
    title: {
        textAlign: "left",
        width: "100%",
        height: ITEM_SIZE.MEDIUM,
        backgroundColor: BACKGROUND_COLOR.MAIN
    }
};

class BottomMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        this.setState({ value });
    }

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
