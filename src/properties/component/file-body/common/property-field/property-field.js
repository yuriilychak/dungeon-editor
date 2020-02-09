import React, {memo, useCallback} from "react";

import {SliderField} from '../slider-field';
import {NumberField} from "../number-field";
import {EnabledField} from "../enable-field";
import {PointSelect} from "../point-select";
import {ColorSelect} from "../color-select";
import {ToggleField} from "../toggle-field";
import {ToggleGroupField} from "../toggle-group-field";
import {TextField} from "../text-field";
import {FileArea} from "../../../../../common-ui";
import {FIELD_TYPE} from "../../../../../enum";

const PropertyField = ({
                           id,
                           data,
                           label,
                           format,
                           onChange,
                           children
                       }) => {
    let Item;
    let userData = null;

    switch (data.type) {
        case FIELD_TYPE.POINT:
            Item = PointSelect;
            userData = data.formats;
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
        case FIELD_TYPE.DROP_AREA:
            Item = FileArea;
            break;
        default:
            return null;
    }

    const dispatchChange = useCallback(value => onChange({
            key: id,
            value,
            type: data.type,
            fromUserData: data.fromUserData,
            format: data.format,
            data: userData
        }), [id, userData, data, onChange]);

    return (
        <Item
            id={id}
            label={label}
            onChange={dispatchChange}
            {...data}
        >
            {children}
        </Item>
    );
};


export default memo(PropertyField);
