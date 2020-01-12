const { mCore } = window;

const { color, math } = mCore.util;

export const generatePoint = (x, y, formats = [], disabled = false, formatX = 0, formatY = 0) => generateProperty(
    { x: math.round(x), y: math.round(y), formatX, formatY },
    "point",
    { formats, disabled }
);

const generateProperty = (value, type = null, otherProps = {}) => ({ value, type, ...otherProps });

export const generateSlider = (value, format, maxValue, minValue = 0) => generateProperty(value, "slider", { format, maxValue, minValue });

export const generateCheckbox = checked => ({ checked, type: "checkbox" });

export const generateColor = intColor => generateProperty(color.intToHex(intColor), "color");

export const generateNumber = (value, format, maxValue = 255, minValue = 0) => generateProperty(
    value,
    "number",
    { minValue, maxValue, format, changeFormatDisabled: true }
    );

export const generateTextAlign = (horizontalAlign, verticalAlign) => generateProperty({ x: horizontalAlign, y: verticalAlign }, "textAlign");

export const updatePoint = (state, key, x, y) => {
    const nextX = math.round(x);
    const nextY = math.round(y);
    const point = state.file.data[key];

    return point.x !== nextX || point.y !== nextY ? {
        ...point,
        x: nextX,
        y: nextY
    } : point;
};
