import { map } from "lodash";

export function getIndent() {
    return map(arguments, element => `${element}px`).join(" ");
}
export const getBorderStyle = (color, size = 1, type = "solid") => `${color} ${type} ${size}px`;
export const createAction = (type, payload) => ({ type, payload });
