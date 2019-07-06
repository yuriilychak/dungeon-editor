import React from "react";
import {useTranslation} from "react-i18next";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/styles";

import {WorkingCanvas} from "./working-canvas";
import {TabContent} from "./tab-content";

import "./working-area.css";

const useTabStyles = makeStyles({
    root: {
        fontSize: 10,
        fontWeight: 500,
        color: "#ffffff",
        height: 24,
        minHeight: 24,
        marginRight: 2,
        backgroundColor: "#3f4045",
        "@media (min-width: 960px)": {
            minWidth: 60
        }
    },
    labelContainer: {
        padding: "0 8px",
        "@media (min-width: 960px)": {
            padding: "0 8px"
        }
    }
});

const useTabsStyles = makeStyles({
    root: {
        minHeight: 24
    }
});

const WorkingArea = ({
                         emptyIndex,
                         locales,
                         emptyIcon,
                         tabs,
                         icons,
                         selectedTab,
                         onSelectTab,
                         onCloseTab
                     }) => {
    const classes = useTabStyles();
    const {t} = useTranslation();

    const createTab = (index, title, icon) => (
        <Tab
            key={index}
            label={
                <TabContent
                    index={index}
                    title={title}
                    icon={icon}
                    onClose={onCloseTab}
                />
            }
            classes={classes}
        />
    );

    const tabsExist = tabs.length !== 0;

    const tabElements = tabsExist ?
        tabs.map(({ title, sectionId }, index) => createTab(index, title, `${icons[sectionId]}_element`)) :
        createTab(emptyIndex, t(locales.emptyTitle), emptyIcon);

    return (
        <div className="working-area-root">
            <div className="working-area-header">
                <Tabs
                    value={selectedTab}
                    onChange={onSelectTab}
                    classes={useTabsStyles()}
                >
                    {tabElements}
                </Tabs>
            </div>
            <div className="working-area-body">
                { !tabsExist && (
                    <div className="working-area-empty-container">
                        <div className="working-area-empty-message">
                            {t(locales.emptyMessage)}
                        </div>
                    </div>
                )}
                <WorkingCanvas/>
            </div>
        </div>
    );
};

export default WorkingArea;
