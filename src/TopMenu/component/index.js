import React from 'react';
import Toolbar from "./Toolbar";
import AppBar from "./AppBar";
import MenuSection from "./MenuSection";

export default (props) => {
    const {staticData, onOpenTab, onCloseTab, openMenu} = props;
    const {sections} = staticData;

    const tabs = sections.map(section => <MenuSection
        {...section}
        onOpen={()=> onOpenTab(section.key)}
        onClose={onCloseTab}
        isOpen={section.key === openMenu}
    />);

    return (
        <AppBar position="static">
            <Toolbar>
                {tabs}
            </Toolbar>
        </AppBar>
    );
}
