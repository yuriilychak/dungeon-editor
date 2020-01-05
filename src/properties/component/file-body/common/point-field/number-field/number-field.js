import React, {memo, useCallback, useState, useEffect} from "react";
import classNames from "classnames";

import {TitledField} from "../../../../../../common-ui";

import "./number-field.scss";

const NumberField = ({
                         label,
                         id,
                         value,
                         isPercent,
                         isPercentOnly,
                         isDegrees,
                         onChange,
                         onPercentChange
                     }) => {
    const [currentValue, setCurrentValue] = useState("");

    useEffect(() => setCurrentValue(value), [value]);

    const handleChange = useCallback(event => {
        const stringValue = event.target.value;

        if (!stringValue) {
            setCurrentValue("");
            return;
        }

        const nextValue = parseInt(event.target.value, 10);

        if (!isNaN(nextValue)) {
            setCurrentValue(nextValue);
        }
    }, []);

    const handleKeyUp = useCallback(event => {
        if (event.keyCode === 13 && currentValue !== "") {
            onChange({ key: id, value: currentValue });
            event.preventDefault();
        }
    },[currentValue, onChange]);

    return (
    <TitledField
        className="properties-number-filed-root"
        title={label}
    >
        <div className="properties-number-filed-wrapper">
            <input
                className="properties-number-filed-value"
                type="text"
                value={currentValue}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
            />
        </div>
        <span
            className={classNames(
                "properties-number-filed-format", {
                    ["properties-number-filed-format-disabled"]: isPercentOnly || isDegrees
                })}
            onClick={onPercentChange}
        >
            {isDegrees
                ? "°"
                : isPercent || isPercentOnly ? "%" : "PX"}
        </span>
    </TitledField>
);
};

export default memo(NumberField);
