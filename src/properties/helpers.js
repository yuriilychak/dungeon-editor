import {FIELD_TYPE, VALUE_FORMAT} from "./constants";

const { mCore } = window;

const { color, math } = mCore.util;

export const generatePoint = (x, y, formats = [], disabled = false, formatX = 0, formatY = 0) => generateProperty(
    { x: math.round(x), y: math.round(y), formatX, formatY },
    FIELD_TYPE.POINT,
    { formats, disabled }
);

const generateProperty = (value, type = null, otherProps = {}) => ({ value, type, ...otherProps });

export const generateSlider = (value, format, maxValue, minValue = 0) => generateProperty(value, FIELD_TYPE.SLIDER, { format, maxValue, minValue });

export const generateCheckbox = checked => ({ checked, type: FIELD_TYPE.CHECKBOX });

export const generateColor = intColor => generateProperty(color.intToHex(intColor), FIELD_TYPE.COLOR);

export const generateEnabled = enabled => generateProperty(enabled, FIELD_TYPE.ENABLED);

export const generateNumber = (value, format, maxValue = 255, minValue = 0) => generateProperty(
    value,
    FIELD_TYPE.NUMBER,
    { minValue, maxValue, format, changeFormatDisabled: true }
    );

export const generateTextAlign = (horizontalAlign, verticalAlign) => generateProperty({ x: horizontalAlign, y: verticalAlign }, FIELD_TYPE.TEXT_ALIGN);

export const updateValue = (state, key, value) => {
    const data = state.file.data[key];
    const prevValue = data.value;

    switch(data.type) {
        case FIELD_TYPE.POINT: {
            const formatX = data.formats[prevValue.formatX];
            const formatY = data.formats[prevValue.formatY];
            const nextX = getNextValue(value.x, formatX);
            const nextY = getNextValue(value.y, formatY);

            if (nextX === value.x && nextY === value.y) {
                return data;
            }

            return ({
                ...data,
                value: {
                    ...prevValue,
                    x: nextX,
                    y: nextY
                }
            });
        }
        case FIELD_TYPE.COLOR: {
            const nextValue = color.intToHex(value);

            if (nextValue === prevValue) {
                return data;
            }

            return ({
                ...data,
                value: nextValue
            });
        }
        case FIELD_TYPE.NUMBER: {
            const nextValue = getNextValue(value, data.format);

            if (nextValue === prevValue) {
                return data;
            }

            return ({
                ...data,
                value: nextValue
            });
        }
        case FIELD_TYPE.ENABLED: {
            if (value === prevValue) {
                return data;
            }

            return ({
                ...data,
                value: value
            });
        }
        default:
            return data;
    }
};

const getNextValue = (value, format) => {
    switch (format) {
        case VALUE_FORMAT.PIXEL:
            return math.round(value);
        case VALUE_FORMAT.PERCENT:
            return math.floatToPercent(value, true);
        case VALUE_FORMAT.DEGREE:
            return math.round(math.toDegrees(value));
        default:
            return 0;
    }
};
