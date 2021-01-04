import { STAGE_ELEMENT_PROP } from "../enum";

const { mCore } = window;
const { DIRECTION } = mCore.enumerator;

export const DEFAULT_ANCHOR = 0.5;
export const DEFAULT_SLICE = 6;
export const DEFAULT_FONT_SIZE = 16;
export const DEFAULT_FONT_NAME = "EmptyFont";
export const DEFAULT_PROGRESS = 0.8;
export const DEFAULT_TEXT_COLOR = 0x000000;

export const LAYOUT_CONFIG = {
    [DIRECTION.LEFT]: {
        enabledKey: STAGE_ELEMENT_PROP.MARGIN_LEFT_ENABLED,
        key: STAGE_ELEMENT_PROP.MARGIN_LEFT
    },
    [DIRECTION.RIGHT]: {
        enabledKey: STAGE_ELEMENT_PROP.MARGIN_RIGHT_ENABLED,
        key: STAGE_ELEMENT_PROP.MARGIN_RIGHT
    },
    [DIRECTION.UP]: {
        enabledKey: STAGE_ELEMENT_PROP.MARGIN_TOP_ENABLED,
        key: STAGE_ELEMENT_PROP.MARGIN_TOP
    },
    [DIRECTION.DOWN]: {
        enabledKey: STAGE_ELEMENT_PROP.MARGIN_BOTTOM_ENABLED,
        key: STAGE_ELEMENT_PROP.MARGIN_BOTTOM
    }
};

export const MARGIN_DIRECTION = [DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.UP, DIRECTION.DOWN];
