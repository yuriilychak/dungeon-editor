import React, {memo, useCallback } from "react";

import Slider from '@material-ui/core/Slider';

import {NumberField} from "../number-field";

import "./slider-field.scss";
import {FIELD_TYPE} from "../../../../constants";
import {generateChangeEvent} from "../helpers";

const SliderField = ({
                         id,
                         value,
                         minValue = 0,
                         step = 1,
                         maxValue,
                         format,
                         fromUserData,
                         onChange
                     }) => {
    const handleChange = useCallback(
        (event, value) => onChange(generateChangeEvent(id, value, FIELD_TYPE.SLIDER, fromUserData, format)),
        [id, fromUserData, format, onChange]
    );

    return (
        <div className="properties-slider-field-root">
            <Slider
                value={value}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
                min={minValue}
                step={step}
                max={maxValue}
            />
            <NumberField
                id={id}
                minValue={minValue}
                maxValue={maxValue}
                step={step}
                className="properties-slider-field-counter-root"
                value={value}
                format={format}
                changeFormatDisabled
                onChange={onChange}
            />
        </div>
    );
}

export default memo(SliderField);
