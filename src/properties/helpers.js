import { get, isEmpty } from "lodash";

import { PROPERTY_LOCATION, VALUE_FORMAT } from "../enum";
import { FIELD_TYPE } from "./constants";

const { mCore } = window;

const { color, math } = mCore.util;

export const generateSection = (sectionData, element, disabledProps) => {
    const result = {};

    sectionData.forEach(data => {
        const { id } = data;
        let value = data.location !== PROPERTY_LOCATION.ROOT ? element.userData[id] : element[id];

        if (data.type === FIELD_TYPE.POINT) {
            value = { x: value.x, y: value.y, formatX: 0, formatY: 0 };
        }

        result[id] = ({
            value: getNextValue(value, data.format, data),
            ...data,
            disabled: disabledProps.indexOf(id) !== -1
        });
    });

    return result;
};

export const updateValue = (state, key, value) => {
    const data = state.file.data[key];

    return updateData(data, data.type !== FIELD_TYPE.TEXT_ALIGN ? getNextValue(value, data.format, data) : value);
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

        return { ...value, x, y };
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
    case VALUE_FORMAT.TEXT:
        return value;
    case VALUE_FORMAT.TEXTURE:
        return { id: 1, title: value };
    case VALUE_FORMAT.OBJECT:
        return { id: 1, title: value };
    default:
        return 0;
    }
};

export const updateSelectedSection = (state, currentInfo) => ({
    ...state,
    currentInfo,
    storedInfo: {
        ...state.storedInfo,
        stage: {
            ...state.storedInfo.stage,
            [currentInfo.id]: currentInfo
        }
    }
});

export const updateFile = (state, nextFile = null, nextFileData = null) => {
    const currentFile = get(state, "file", {});
    const currentFileData = get(currentFile, "data", {});

    return {
        ...state,
        file: nextFile !== null ? {
            ...currentFile,
            ...nextFile,
            data: !isEmpty(nextFileData) ? {
                ...currentFileData,
                ...nextFileData
            } : currentFileData
        } : nextFile
    };
};
