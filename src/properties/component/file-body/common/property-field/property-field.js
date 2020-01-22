import React, { memo } from "react";

import { SliderField } from '../slider-field';
import { NumberField } from "../number-field";
import {EnabledField} from "../enable-field";
import {FIELD_TYPE} from "../../../../constants";
import {PointSelect} from "../base/point-select";
import {ColorSelect} from "../base/color-select";
import {ToggleField} from "../toggle-field";
import {ToggleGroupField} from "../toggle-group-field";
import {TextField} from "../text-field";

const PropertyField = ({
    id,
    data,
    locales = {},
    onChange,
    children
                       }) => {
    let Item;

    switch(data.type) {
        case FIELD_TYPE.POINT:
            Item = PointSelect;
            break;
        case FIELD_TYPE.COLOR:
            Item = ColorSelect;
            break;
        case FIELD_TYPE.SLIDER:
            Item = SliderField;
            break;
        case FIELD_TYPE.CHECKBOX:
            Item = ToggleField;
            break;
        case FIELD_TYPE.NUMBER:
            Item = NumberField;
            break;
        case FIELD_TYPE.ENABLED:
            Item = EnabledField;
            break;
        case FIELD_TYPE.TOGGLE_GROUP:
            Item = ToggleGroupField;
            break;
        case FIELD_TYPE.TEXT:
            Item = TextField;
            break;
        default:
            return null;
    }

    return (
        <Item
            id={id}
            {...locales}
            {...data}
            onChange={onChange}
        >
            {children}
        </Item>
    );
};


export default memo(PropertyField);
