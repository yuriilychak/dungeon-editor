import React from "react";
import {useTranslation} from "react-i18next";

import Tabs from "./tabs";
import Tab from "./tab";
import {ElementContent} from "./tab-content";

import "./bottom-menu.scss";

const BottomMenu = ({
                        sectionConfig,
                        sectionId,
                        tabIndex,
                        onChangeTab
                    }) => {
    let tabElement = null;
    let elementContent = null;
    const {t} = useTranslation();
    const isSectionSelected = sectionId !== -1;

    if (isSectionSelected) {
        const tabData = sectionConfig[sectionId];

        const tabs = tabData.map((tab, index) => (
            <Tab label={t(tab.locale)} key={index}/>
        ));

        tabElement = (
            <Tabs value={Math.min(tabIndex, tabs.length - 1)} onChange={onChangeTab}>
                {tabs}
            </Tabs>
        );

        elementContent = sectionId === 0 && tabIndex === 0 ? (
            <ElementContent {...tabData[tabIndex].content} />
            ) : (
            <div />
        )
    }

    return (
        <div className="bottom-menu-root">
            <div className="bottom-menu-title">
                {tabElement}
            </div>
            <div className="bottom-menu-content">
                {elementContent}
            </div>
        </div>
    );
};

export default BottomMenu;
