import React from 'react';
import {useTranslation} from "react-i18next";

import Tabs from './tabs';
import Tab from './tab';

import "./bottom-menu.scss";

const BottomMenu = ({
                        sectionConfig,
                        sectionId,
                        tabIndex,
                        onChangeTab
                    }) => {
    let tabElement = null;
    const { t } = useTranslation();

    if (sectionId !== -1) {
        const tabData = sectionConfig[sectionId];

        const tabs = tabData.map((tab, index) => (
            <Tab label={t(tab.locale)} key={index} />
        ));

        tabElement = (
            <Tabs value={Math.min(tabIndex, tabs.length - 1)} onChange={onChangeTab}>
                { tabs }
            </Tabs>
        );
    }

    return (
        <div className="bottom-menu-root">
            <div className="bottom-menu-title">
                {tabElement}
            </div>
            <div className="bottom-menu-content">
                {sectionId !== -1 && "Bottom menu"}
            </div>
        </div>
    );
};

export default BottomMenu;
