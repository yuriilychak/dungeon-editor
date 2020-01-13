import React, { memo } from "react";

import {PropertyRow} from "../base/property-row";
import {ColorSelect} from "../base/color-select";

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
        <ColorSelect
            value={value}
            id={id}
            onChange={onChange}
        />
        {children}
    </PropertyRow>
);

export default memo(ColorField);
