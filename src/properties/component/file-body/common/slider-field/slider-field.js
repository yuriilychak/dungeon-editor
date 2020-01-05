import React, {memo} from "react";

import Slider from '@material-ui/core/Slider';

import {PropertyRow} from "../property-row";

import "./slider-field.scss";

const SliderField = ({
                         id,
                         label,
                         value,
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
            min={0}
            step={1}
            max={maxValue}
        />
        <div className="properties-slider-field-counter-root">
            <span className="properties-slider-field-counter-value">
            {value}
            </span>
            <span className="properties-slider-field-counter-format">
            {format}
            </span>
        </div>
    </PropertyRow>
);

export default memo(SliderField);
