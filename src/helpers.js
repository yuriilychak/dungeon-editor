import { map, isString } from "lodash";
import { connect } from 'react-redux';

export function getIndent() {
    return map(arguments, element => `${element}px`).join(" ");
}

export const getBorderStyle = (color, size = 1, type = "solid") => `${color} ${type} ${size}px`;
export const handleAction = (type, payload = null) => ({ type, payload });

export const generateLocale = (localeTemplate, t) => {
    const result = {};
    let localeData, key;

    for (key in localeTemplate){
        localeData = localeTemplate[key];

        result[key] = isString(localeData) ? t(localeData) : generateLocale(localeData, t);
    }

    return result;
};

export const connectStore = (component, storeKey, callbacks) => connect(state => state[storeKey], callbacks)(component);

export const generateReducerData = (definedState, handlers) => ({ definedState, handlers });

export const addFormat = (path, format) => `${path}.${format}`;
