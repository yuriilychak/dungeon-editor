import React from 'react';
import Toolbar from "./Toolbar";
import AppBar from "./AppBar";
import MenuSection from "./MenuSection";

export default (props) => {
    const {staticData, onOpenTab, onCloseTab, openMenu} = props;
    const {tabs} = staticData;

    const tabComponents = tabs.map(section => <MenuSection
        {...section}
        onOpen={()=> onOpenTab(section.key)}
        onClose={onCloseTab}
        isOpen={section.key === openMenu}
    />);

    return (
        <AppBar position="static">
            <Toolbar>
                {tabComponents}
            </Toolbar>
        </AppBar>
    );
}
