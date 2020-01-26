import React, {memo, useCallback, useState, useEffect, useMemo } from "react";

import {PinField} from "./pin-field";
import {Icon} from "../../../../../common-ui";

import "./layout-field.scss";

const LayoutField = ({

}) => {
    return (
        <div className="properties-layout-field-root">
            <PinField
                id="top"
                value={0}
                onChange={() => {}}
            />
            <div className="properties-layout-field-middle">
                <PinField
                    id="left"
                    value={0}
                    onChange={() => {}}
                />
                <div className="properties-layout-field-square">
                    <Icon
                        size="100%"
                        className="properties-layout-field-icon-horizontal"
                        name="properties/size"
                    />
                    <Icon
                        size="100%"
                        className="properties-layout-field-icon-vertical"
                        name="properties/size"
                    />
                </div>
                <PinField
                    id="right"
                    value={0}
                    onChange={() => {}}
                />
            </div>
            <PinField
                id="bottom"
                value={0}
                onChange={() => {}}
            />
        </div>
    );
};

export default memo(LayoutField);
