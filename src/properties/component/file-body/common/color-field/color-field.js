import React, { memo } from "react";
import ColorPicker from 'rc-color-picker';

import {PropertyRow} from "../property-row";

import "rc-color-picker/assets/index.css";
import "./color-field.scss";

const ColorField = ({
    id,
    value,
    label,
    onChange,
    children
}) => (
    <PropertyRow
        label={label}
    >
        <ColorPicker enableAlpha={false} color={value} onChange={data => onChange({ key: id, value: data.color })} mode="RGB" placement="bottomRight" />
        {children}
    </PropertyRow>
);

export default memo(ColorField);
