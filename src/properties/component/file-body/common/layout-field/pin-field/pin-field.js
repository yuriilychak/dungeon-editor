import React, { memo } from "react";

import {Icon} from "../../../../../../common-ui";
import {NumberField} from "../../number-field";
import {VALUE_FORMAT} from "../../../../../../enum";

import "./pin-field.scss";

const PinField = ({
    id,
    value,
    onChange
}) => (
    <div className={`properties-pin-field-${id}`}>
        <Icon
            size={16}
            name="properties/pin"
            className={`properties-pin-icon-${id}`}
        />
        <div className="properties-pin-divider" />
        <NumberField
            disabled
            value={value}
            id={id}
            format={VALUE_FORMAT.PIXEL}
            changeFormatDisabled
            onChange={onChange}
        />
    </div>
);

export default memo(PinField);
