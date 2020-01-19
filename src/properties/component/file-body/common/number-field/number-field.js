import React, {memo, useCallback, useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import { string, bool, func, number } from "prop-types";
import { noop } from "lodash";

import {TitledField} from "../../../../../common-ui";

import "./number-field.scss";
import {FIELD_TYPE} from "../../../../constants";
import {generateChangeEvent} from "../helpers";

const KEYBOARD_KEYS = {
    ENTER: 13,
    UP: 38,
    DOWN: 40
};

const emptyKeyData = { keyCode: null, timerId: null };

const NumberField = ({
                         label,
                         id,
                         value,
                         step = 1,
                         timeout = 50,
                         minValue = -Infinity,
                         maxValue = Infinity,
                         format,
                         changeFormatDisabled = true,
                         className,
                         onChange,
                         disabled,
                         fromUserData,
                         onChangeFormat = noop
                     }) => {
    const [currentValue, setCurrentValue] = useState("");
    const [keyData, setKeyData] = useState(emptyKeyData);

    useEffect(() => setCurrentValue(value), [value]);

    const handleChange = useCallback(event => {
        const stringValue = event.target.value;

        if (!stringValue) {
            setCurrentValue("");
            return;
        }

        let nextValue = parseInt(event.target.value, 10);

        if (!isNaN(nextValue)) {
            nextValue = Math.max(minValue, Math.min(nextValue, maxValue));
            setCurrentValue(nextValue);
        }
    }, []);

    const dispatchChange = useCallback((targetValue, isSetValue = true) => {
        if (isSetValue) {
            setCurrentValue(targetValue);
        }
        onChange(generateChangeEvent(id, targetValue, FIELD_TYPE.NUMBER, fromUserData, format))
    }, [id, fromUserData, format, onChange]);


    const handleKeyEvent = useCallback(key => {
        switch(key) {
            case KEYBOARD_KEYS.ENTER: {
                if (currentValue !== "") {
                    dispatchChange(currentValue, false);
                }
                break;
            }
            case KEYBOARD_KEYS.UP: {
                const nextValue = currentValue + step;
                if (nextValue <= maxValue) {
                    dispatchChange(nextValue);
                }
                break;
            }
            case KEYBOARD_KEYS.DOWN: {
                const nextValue = currentValue - step;
                if (nextValue >= minValue) {
                    dispatchChange(nextValue);
                }
                break;
            }
            default: {
                return;
            }
        }
    }, [dispatchChange, currentValue, step, minValue, maxValue]);

    const handleKeyDown = useCallback( event => {
        const { keyCode } = event;

        if (keyData.keyCode !== keyCode && (keyCode === KEYBOARD_KEYS.UP || keyCode === KEYBOARD_KEYS.DOWN)) {
            if (keyData.keyCode !== null) {
                clearTimeout(keyData.timerId);
            }

            setKeyData({
                keyCode,
                timerId: null
            })
        }
    }, [keyData, handleKeyEvent]);

    const handleKeyUp = useCallback(event => {
        if (keyData.keyCode === event.keyCode) {
            clearTimeout(keyData.timerId);
            setKeyData(emptyKeyData);
        }

        handleKeyEvent(event.keyCode);

    }, [keyData, handleKeyEvent]);

    const handleChangeFormat = useCallback(() => onChangeFormat(id, format), [onChangeFormat, id]);

    useEffect(() => {
        if (keyData.keyCode) {
            setTimeout(() => handleKeyEvent(keyData.keyCode), timeout);
        }

    }, [keyData.keyCode, currentValue, handleKeyEvent, timeout]);

    const formatClassName = useMemo(() => classNames(
        "properties-number-filed-format", {
            "properties-number-filed-format-disabled": changeFormatDisabled
        }), [changeFormatDisabled]);

    const rootClassName = useMemo(() => classNames("properties-number-filed-root", {
        "properties-number-filed-root-disabled": disabled,
    }, className), [className, disabled]);

    return (
        <TitledField
            className={rootClassName}
            title={label}
        >
            <div className="properties-number-filed-wrapper">
                <input
                    className="properties-number-filed-value"
                    type="text"
                    value={currentValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                />
            </div>
            <span
                className={formatClassName}
                onClick={handleChangeFormat}
            >
            {format}
        </span>
        </TitledField>
    );
};


NumberField.propTypes = {
    disabled: bool,
    label: string,
    id: string.isRequired,
    value: number.isRequired,
    format: string.isRequired,
    minValue: number,
    maxValue: number,
    step: number,
    timeout: number,
    changeFormatDisabled: bool,
    onChange: func,
    onChangeFormat: func,
    className: string
};

export default memo(NumberField);
