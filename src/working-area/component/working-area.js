import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/styles";
import Cached from "@material-ui/icons/Cached";

import { ToolButton } from "../../common-ui/tool-button";
import { WorkingCanvas } from "./working-canvas";
import { TabContent } from "./tab-content";

import {
    ITEM_SIZE,
    INDENT_SIZE,
    FONT_SIZE,
    BACKGROUND_COLOR,
    TEXT_COLOR
} from "../../constant";

import { getIndent } from "../../helpers";

import "./working-area.scss";

const useTabStyles = makeStyles({
    root: {
        fontSize: FONT_SIZE.SMALL,
        fontWeight: 500,
        color: TEXT_COLOR.CONTRAST,
        height: ITEM_SIZE.SMALL,
        minHeight: ITEM_SIZE.SMALL,
        marginRight: INDENT_SIZE.XS,
        backgroundColor: BACKGROUND_COLOR.MAIN,
        padding: getIndent(INDENT_SIZE.NONE, INDENT_SIZE.L),
        "@media (min-width: 960px)": {
            padding: getIndent(INDENT_SIZE.NONE, INDENT_SIZE.L),
            minWidth: ITEM_SIZE.BIG
        }
    }
});

const useTabsStyles = makeStyles({
    root: {
        minHeight: ITEM_SIZE.SMALL
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
    mode,
    selectedTab,
    onSelectTab,
    onGetCanvasRef,
    onCloseTab,
    onZoomChange,
    onTransformReset,
    onCreateElement,
    onComponentMount,
    onScrollStart,
    onScrollMove,
    onScrollEnd,
    onChangeMode
}) => {
    const classes = useTabStyles();
    const { t } = useTranslation();

    useEffect(onComponentMount, []);

    const createTab = (index, title, icon, isDefault) => (
        <Tab
            key={index}
            label={
                <TabContent
                    index={index}
                    title={title}
                    icon={icon}
                    onClose={onCloseTab}
                    isDefault={isDefault}
                />
            }
            classes={classes}
        />
    );

    const tabsExist = tabs.length !== 0;

    const tabElements = tabsExist ?
        tabs.map(({ title, sectionId }, index) => createTab(index, title, `${icons[sectionId]}_element`), false) :
        createTab(emptyIndex, t(locales.emptyTitle), emptyIcon, true);

    const getAriaValueText = value => `${Math.round(value * 100)}%`;
    const valueLabelFormat = value => `${Math.round(value * 100)}%`;

    const handleTabSelect = (event, index) => {
        if (!tabs.length) {
            return;
        }
        const { sectionId, fileId } = tabs[index];
        onSelectTab(index, sectionId, fileId);
    };

    return (
        <div className="working-area-root">
            <div className="working-area-header">
                <Tabs
                    value={selectedTab}
                    onChange={handleTabSelect}
                    classes={useTabsStyles()}
                >
                    {tabElements}
                </Tabs>
            </div>
            <div className="working-area-body">
                <div className="working-area-interactions"
                    onMouseDown={onScrollStart}
                    onMouseUp={onScrollEnd}
                    onMouseMove={onScrollMove}
                >
                    <WorkingCanvas
                        onCreateElement={onCreateElement}
                        onGetCanvasRef={onGetCanvasRef}
                        hidden={!tabsExist}
                    />
                </div>
                {!tabsExist && (
                    <div className="working-area-empty-container">
                        <div className="working-area-empty-message">
                            {t(locales.emptyMessage)}
                        </div>
                    </div>
                )}
                {
                    tabsExist && (
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
                            <div
                                className="working-area-control-panel-mode"
                                onClick={onChangeMode}
                            >
                                {t(`${locales.editMode}${mode}`)}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default WorkingArea;
