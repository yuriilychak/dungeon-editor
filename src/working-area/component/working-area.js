import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Slider from '@material-ui/core/Slider';
import {makeStyles} from "@material-ui/styles";
import Cached from "@material-ui/icons/Cached";

import {ToolButton} from "../../common-ui/tool-button";
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
        padding: "0 8px",
        "@media (min-width: 960px)": {
            padding: "0 8px",
            minWidth: 60
        }
    }
});

const useTabsStyles = makeStyles({
    root: {
        minHeight: 24
    }
});

const WorkingArea = ({
                         zoom,
                         zoomValue,
                         emptyIndex,
                         locales,
                         emptyIcon,
                         tabs,
                         icons,
                         selectedTab,
                         onSelectTab,
                         onGetCanvasRef,
                         onCloseTab,
                         onZoomChange,
                         onTransformReset,
                         onComponentMount
                     }) => {
    const classes = useTabStyles();
    const {t} = useTranslation();

    useEffect(onComponentMount, []);

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
        tabs.map(({title, sectionId}, index) => createTab(index, title, `${icons[sectionId]}_element`)) :
        createTab(emptyIndex, t(locales.emptyTitle), emptyIcon);

    const getAriaValueText = value => `${value * 100}%`;
    const valueLabelFormat = value => `${value * 100}%`;

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
                <WorkingCanvas onGetCanvasRef={onGetCanvasRef}/>
                {tabsExist && (
                    <div className="working-area-empty-container">
                        <div className="working-area-empty-message">
                            {t(locales.emptyMessage)}
                        </div>
                    </div>
                )}
                {
                    !tabsExist && (
                        <div className="working-area-control-panel">
                            <ToolButton
                                Icon={Cached}
                                onClick={onTransformReset}
                            />
                            <Slider
                                {...zoom}
                                value={zoomValue}
                                valueLabelFormat={valueLabelFormat}
                                getAriaValueText={getAriaValueText}
                                onChange={onZoomChange}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default WorkingArea;
