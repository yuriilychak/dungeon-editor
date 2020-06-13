import React from 'react';
import Toolbar from "./toolbar";
import AppBar from "./app-bar";
import MenuSection from "./menu-section";

export default ({ tabs, onOpenTab, onCloseTab, onSelectSection, openMenu, toggledSections }) => (
    <AppBar position="static">
        <Toolbar>
            {tabs.map(section => <MenuSection
                {...section}
                key={section.id}
                onOpen={onOpenTab}
                onClose={onCloseTab}
                onSelectSection={onSelectSection}
                isOpen={section.id === openMenu}
                toggledSections={section.useToggles ? toggledSections : undefined}
            />)}
        </Toolbar>
    </AppBar>
);
