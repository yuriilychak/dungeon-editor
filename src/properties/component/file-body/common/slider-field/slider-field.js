import React, {memo} from "react";

import Slider from '@material-ui/core/Slider';

import {PropertyRow} from "../property-row";
import {NumberField} from "../number-field";

import "./slider-field.scss";

const SliderField = ({
                         id,
                         label,
                         value,
                         minValue = 0,
                         step = 1,
                         maxValue,
                         format,
                         onChange
                     }) => (
    <PropertyRow
        label={label}
    >
        <Slider
            value={value}
            onChange={(event, value) => onChange({key: id, value})}
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
    </PropertyRow>
);

export default memo(SliderField);
