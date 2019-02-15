import React, {Component} from 'react';
import MenuToolbar from "./MenuToolbar";
import AppBar from '@material-ui/core/AppBar';
import MenuButton from "./MenuButton";

export default class TopMenu extends Component {
    render() {
        return (
            <AppBar position="static">
                <MenuToolbar>
                    <MenuButton>File</MenuButton>
                    <MenuButton>Edit</MenuButton>
                </MenuToolbar>
            </AppBar>
        );
    }
}