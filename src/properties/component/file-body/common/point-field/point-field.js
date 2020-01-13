import React, { memo } from "react";
import { string, number, func, arrayOf, bool, shape } from "prop-types";

import {PropertyRow} from "../property-row";
import {PointSelect} from "../point-select";

import "./point-field.scss";

const PointField = ({
                        id,
                        labelMain,
                        labelX,
                        labelY,
                        formats,
                        value,
                        disabled,
                        onChange
                    }) => (
        <PropertyRow
            label={labelMain}
        >
            <PointSelect
                id={id}
                labelX={labelX}
                labelY={labelY}
                value={value}
                disabled={disabled}
                formats={formats}
                onChange={onChange}
            />
        </PropertyRow>
);

PointField.propTypes = {
    id: string.isRequired,
    formats: arrayOf(string).isRequired,
    value: shape({
        x: number,
        y: number,
        formatX: number,
        formatY: number
    }).isRequired,
    disabled: bool,
    onChange: func.isRequired
};

export default memo(PointField);
