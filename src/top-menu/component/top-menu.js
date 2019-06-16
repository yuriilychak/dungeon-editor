import React from 'react';
import Toolbar from "./toolbar";
import AppBar from "./app-bar";
import MenuSection from "./menu-section";

export default (props) => {
    const {staticData, onOpenTab, onCloseTab, onSelectSection, openMenu, toggledSections} = props;
    const {tabs} = staticData;

    const tabComponents = tabs.map(section => <MenuSection
        {...section}
        key={section.id}
        onOpen={onOpenTab}
        onClose={onCloseTab}
        onSelectSection={onSelectSection}
        isOpen={section.id === openMenu}
        toggledSections={section.useToggles ? toggledSections : undefined}
    />);

    return (
        <AppBar position="static">
            <Toolbar>
                {tabComponents}
            </Toolbar>
        </AppBar>
    );
}
