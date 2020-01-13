import React, {memo, useState, useCallback, useEffect } from "react";
import { string, number, func, arrayOf, bool, shape } from "prop-types";

import {NumberField} from "../number-field";

import "./point-select.scss";

const PointSelect = ({
                        id,
                        labelX,
                        labelY,
                        formats,
                        value,
                        disabled,
                        onChange
                    }) => {
    const [data, setData] = useState({ x: 0, y: 0, formatX: 0, formatY: 0 });

    useEffect(() => setData({ ...value }), [value]);

    const dispatchChange = useCallback((key, nextValue) => {
        const nextData = { ...data, [key]: nextValue };

        setData(nextData);
        onChange({ key: id, value: nextData});
    }, [data, onChange]);

    const handleChangeFormat = useCallback(cordId => {
        const formatKey = `format${cordId.toUpperCase()}`;
        let nextFormat = data[formatKey] + 1;

        if (nextFormat >= formats.length) {
            nextFormat = 0;
        }

        dispatchChange(formatKey, nextFormat);
    }, [formats, data, dispatchChange]);

    const handleChange = useCallback(({key, value}) => dispatchChange(key, value), [data, onChange, id]);

    const changeFormatDisabled = formats.length < 2;

    return (
        <div className="properties-point-select-root">
            <NumberField
                label={labelX}
                id="x"
                value={data.x}
                disabled={disabled}
                changeFormatDisabled={changeFormatDisabled}
                format={formats[data.formatX]}
                onChange={handleChange}
                onChangeFormat={handleChangeFormat}
            />
            <div className="properties-point-select-padding" />
            <NumberField
                label={labelY}
                id="y"
                value={data.y}
                disabled={disabled}
                changeFormatDisabled={changeFormatDisabled}
                format={formats[data.formatY]}
                onChange={handleChange}
                onChangeFormat={handleChangeFormat}
            />
        </div>
    );
};

PointSelect.propTypes = {
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

export default memo(PointSelect);
