import { map } from "lodash";

export function getIndent() {
    return map(arguments, element => `${element}px`).join(" ");
}

export function getBorderStyle(color, size = 1, type = "solid") {
    return `${color} ${type} ${size}px`;
}
