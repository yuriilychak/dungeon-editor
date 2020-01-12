import React, { memo } from "react";

import { CheckBox } from '../check-box';
import { PointField } from '../point-field';
import { SliderField } from '../slider-field';
import { ColorField } from '../color-field';
import { NumberField } from "../number-field";
import { TextAlignField } from "../text-align-field";

const PropertyField = ({
    id,
    data,
    locales,
    onChange,
    children
                       }) => {
    let Item;

    switch(data.type) {
        case "point":
            Item = PointField;
            break;
        case "color":
            Item = ColorField;
            break;
        case "slider":
            Item = SliderField;
            break;
        case "checkbox":
            Item = CheckBox;
            break;
        case "number": {
            Item = NumberField;
            break;
        }
        case "textAlign":
            Item = TextAlignField;
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
