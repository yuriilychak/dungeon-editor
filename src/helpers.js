import { map, isString } from "lodash";
import { connect } from 'react-redux';

export function getIndent() {
    return map(arguments, element => `${element}px`).join(" ");
}

export const getBorderStyle = (color, size = 1, type = "solid") => `${color} ${type} ${size}px`;
export const createAction = (type, payload) => ({ type, payload });
export const dispatchAction = (type, payload) => ({ type, payload });
export const handleAction = (state, handlers, action) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action.payload) : state;
};

export const generateLocale = (localeTemplate, t) => {
    const result = {};
    let localeData, key;

    for (key in localeTemplate){
        if (!localeTemplate.hasOwnProperty(key)) {
            continue;
        }

        localeData = localeTemplate[key];

        result[key] = isString(localeData) ? t(localeData) : generateLocale(localeData, t);
    }

    return result;
};

export const connectStore = (component, storeKey, callbacks) => connect(state => state[storeKey], callbacks)(component);
