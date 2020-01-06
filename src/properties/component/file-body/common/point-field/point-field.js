import React, {memo, useState, useCallback, useEffect } from "react";
import { string, number, func, arrayOf } from "prop-types";

import {NumberField} from "../number-field";
import {PropertyRow} from "../property-row";

const PointField = ({
                        id,
                        labelMain,
                        labelX,
                        labelY,
                        formats,
                        formatX = 0,
                        formatY = 0,
                        x,
                        y,
                        onChange
                    }) => {
    const [data, setData] = useState({ x: 0, y: 0, formatX: 0, formatY: 0 });

    useEffect(() => setData({ x, y, formatX, formatY }), [x, y, formatX, formatY]);

    const dispatchChange = useCallback((key, value) => {
        const nextData = { ...data, [key]: value };

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
        <PropertyRow
            label={labelMain}
        >
            <NumberField
                label={labelX}
                id="x"
                value={data.x}
                changeFormatDisabled={changeFormatDisabled}
                format={formats[data.formatX]}
                onChange={handleChange}
                onChangeFormat={handleChangeFormat}
            />
            <NumberField
                label={labelY}
                id="y"
                value={data.y}
                changeFormatDisabled={changeFormatDisabled}
                format={formats[data.formatY]}
                onChange={handleChange}
                onChangeFormat={handleChangeFormat}
            />
        </PropertyRow>
    );
};

PointField.propTypes = {
    id: string.isRequired,
    formats: arrayOf(string).isRequired,
    formatX: number,
    formatY: number,
    x: number,
    y: number,
    onChange: func.isRequired
};

export default memo(PointField);
