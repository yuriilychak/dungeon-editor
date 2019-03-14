import React, {Component} from 'react';
import Toolbar from "./Toolbar";
import AppBar from "./AppBar";
import MenuSection from "./MenuSection";

export default class TopMenu extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <MenuSection title={"File"}/>
                    <MenuSection title={"Edit"}/>
                </Toolbar>
            </AppBar>
        );
    }
}
