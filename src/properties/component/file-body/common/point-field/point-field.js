import React, {memo, useState, useCallback, useEffect} from "react";

import {NumberField} from "./number-field";
import {PropertyRow} from "../property-row";

const PointField = ({
                        id,
                        mainLabel,
                        xLabel,
                        yLabel,
                        x,
                        y,
                        isPercentOnly,
                        isDegrees,
                        onChange
                    }) => {
    const [isPercentX, setPercentX] = useState(false);
    const [isPercentY, setPercentY] = useState(false);
    const [data, setData] = useState({x: 0, y: 0});

    useEffect(() => setData({ x, y }), [x, y]);

    const handlePercentXChange = useCallback(() => setPercentX(!isPercentX), [isPercentX]);
    const handlePercentYChange = useCallback(() => setPercentY(!isPercentY), [isPercentY]);
    const handleChange = useCallback(({key, value}) => {
        const nextData = {
            ...data,
            [key]: value
        };
        setData(nextData);
        onChange({ key: id, value: nextData});
    }, [data, onChange, id]);

    return (
        <PropertyRow
            label={mainLabel}
        >
            <NumberField
                isPercentOnly={isPercentOnly}
                label={xLabel}
                id={"x"}
                value={data.x}
                isPercent={isPercentX}
                isDegrees={isDegrees}
                onChange={handleChange}
                onPercentChange={handlePercentXChange}
            />
            <NumberField
                isPercentOnly={isPercentOnly}
                label={yLabel}
                id={"y"}
                value={data.y}
                isPercent={isPercentY}
                isDegrees={isDegrees}
                onChange={handleChange}
                onPercentChange={handlePercentYChange}
            />
        </PropertyRow>
    );
};

export default memo(PointField);
