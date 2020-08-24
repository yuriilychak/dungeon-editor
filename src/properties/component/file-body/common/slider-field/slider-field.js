import React, { memo, useCallback } from "react";

import Slider from '@material-ui/core/Slider';

import { NumberField } from "../number-field";

import "./slider-field.scss";

const SliderField = ({
    id,
    value,
    minValue = 0,
    step = 1,
    maxValue,
    format,
    location,
    onChange
}) => {
    const handleChange = useCallback((event, value) => onChange(value), [onChange]);

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
};

export default memo(SliderField);
