import React, {Component} from 'react';
import Toolbar from "./Toolbar";
import AppBar from "./AppBar";
import Button from "./Button";



export default class TopMenu extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button>File</Button>
                    <Button>Edit</Button>
                </Toolbar>
            </AppBar>
        );
    }
}
