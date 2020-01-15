import {FIELD_TYPE, VALUE_FORMAT} from "./constants";

const { mCore } = window;

const { color, math } = mCore.util;

export const generatePoint = (point, formats = [], disabled = false, formatX = 0, formatY = 0) => generateFormattedProperty(
    { x: point.x, y: point.y, formatX, formatY },
    FIELD_TYPE.POINT,
    VALUE_FORMAT.POINT,
    { formats, disabled }
);

const generateProperty = (value, type = null, otherProps = {}) => ({ value, type, ...otherProps });

const generateFormattedProperty = (value, type, format, otherProps = {}) => generateProperty(getNextValue(value, format, otherProps), type, { ...otherProps, format });

export const generateSlider = (value, format, maxValue, minValue = 0) =>
    generateFormattedProperty(value, FIELD_TYPE.SLIDER, format, { maxValue, minValue });

export const generateCheckbox = value => generateFormattedProperty(value, FIELD_TYPE.CHECKBOX, VALUE_FORMAT.BOOL);

export const generateColor = value => generateFormattedProperty(value, FIELD_TYPE.COLOR, VALUE_FORMAT.COLOR);

export const generateEnabled = value => generateFormattedProperty(value, FIELD_TYPE.ENABLED, VALUE_FORMAT.BOOL);

export const generateNumber = (value, format, maxValue = 255, minValue = 0) =>
    generateFormattedProperty(value, FIELD_TYPE.NUMBER, format, { minValue, maxValue, changeFormatDisabled: true });

export const generateTextAlign = (horizontalAlign, verticalAlign) => generateProperty({ x: horizontalAlign, y: verticalAlign }, FIELD_TYPE.TEXT_ALIGN);

export const updateValue = (state, key, value) => {
    const data = state.file.data[key];

    switch(data.type) {
        case FIELD_TYPE.TEXT_ALIGN: {
            return updateData(data, value);
        }
        case FIELD_TYPE.CHECKBOX:
        case FIELD_TYPE.POINT:
        case FIELD_TYPE.COLOR:
        case FIELD_TYPE.NUMBER:
        case FIELD_TYPE.SLIDER:
        case FIELD_TYPE.ENABLED: {
            const nextValue = getNextValue(value, data.format, data);

            return updateData(data, nextValue);
        }
        default:
            return data;
    }
};

const updateData = (prevData, nextValue) => {
    const prevValue = prevData.value;
    const isObject = mCore.util.type.isObject(prevValue);
    const isDifferent = isObject ?
        Object.keys(prevValue).some(key => prevValue[key] !== nextValue[key]) :
        nextValue !== prevValue;
    return isDifferent ? ({
        ...prevData,
        value: nextValue
    }) : prevData;
};

const getNextValue = (value, format, data) => {
    switch (format) {
        case VALUE_FORMAT.POINT: {
            const formatX = data.formats[value.formatX];
            const formatY = data.formats[value.formatY];
            const x = getNextValue(value.x, formatX, data);
            const y = getNextValue(value.y, formatY, data);

            return {...value, x, y};
        }
        case VALUE_FORMAT.PIXEL:
            return math.round(value);
        case VALUE_FORMAT.PERCENT:
            return math.floatToPercent(value, true);
        case VALUE_FORMAT.DEGREE:
            return math.round(math.toDegrees(value));
        case VALUE_FORMAT.COLOR:
            return color.intToHex(value);
        case VALUE_FORMAT.BOOL:
            return value;
        default:
            return 0;
    }
};
