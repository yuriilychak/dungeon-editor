import React, {memo, useState, useCallback, useEffect } from "react";
import { string, number, func, shape } from "prop-types";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import VerticalAlignCenterIcon from "@material-ui/icons/VerticalAlignCenter";

import {ToggleGroupField} from "../toggle-group-field";
import {PropertyRow} from "../property-row";

import "./text-align-field.scss";

const verticalItems = [
    VerticalAlignTopIcon,
    VerticalAlignCenterIcon,
    VerticalAlignBottomIcon
];

const horizontalItems = [
    FormatAlignLeftIcon,
    FormatAlignCenterIcon,
    FormatAlignRightIcon
];

const TextAlignField = ({
    label,
    id,
    onChange,
    value
                        }) => {
    const [align, setAlign] = useState({
        x: 0,
        y: 0
    });

    const handleChange = useCallback(({ key, value }) => {
        const nextAlign = {
            ...align,
            [key]: value
        };
        onChange({ key: id, value: nextAlign });
        setAlign(nextAlign);
    }, [id, onChange, align]);

    useEffect(() => setAlign({ ...value }),[value]);

    return (
        <PropertyRow
            label={label}
        >
            <ToggleGroupField
                id="x"
                onChange={handleChange}
                value={align.x}
                items={horizontalItems}
            />
            <div className="properties-text-align-field-divider"/>
            <ToggleGroupField
                id="y"
                onChange={handleChange}
                value={align.y}
                items={verticalItems}
            />
        </PropertyRow>
    )
};

TextAlignField.propTypes = {
    label: string.isRequired,
    onChange: func.isRequired,
    id: string.isRequired,
    value: shape({
        x: number.isRequired,
        y: number.isRequired
    }).isRequired
};

export default memo(TextAlignField);
