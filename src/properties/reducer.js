import StaticData from "./data";
import STATE from "./state";
import {handleAction} from "../helpers";
import {STAGE_ELEMENT_PROP} from "../enum";
import {DEGREE_FORMATS, DIMENSION_FORMATS, PERCENT_FORMATS, VALUE_FORMAT} from "./constants";
import {
    generateSlider,
    generateCheckbox,
    generatePoint,
    generateColor,
    generateNumber,
    generateTextAlign,
    updateValue,
    generateEnabled
} from "./helpers";

const {mCore} = window;

const {math} = mCore.util;

export const initialState = {
    ...StaticData,
    file: null
};

const actionHandlers = {
    [STATE.SELECT_LIBRARY_ELEMENT]: (state, file) => ({
        ...state,
        file: {...file, isStageElement: false, isRoot: false}
    }),
    [STATE.DELETE_LIBRARY_ELEMENT]: (state, {ids, sectionId}) =>
        ids.some(id => checkSelectedElement(state.file, id, sectionId)) ? {
            ...state,
            file: null
        } : state,
    [STATE.RENAME_LIBRARY_ELEMENT]: (state, {id, sectionId, name}) =>
        checkSelectedElement(state.file, id, sectionId) ? {
            ...state,
            file: {
                ...state.file,
                name
            }
        } : state,
    [STATE.SELECT_STAGE_ELEMENT]: (state, stageElement) => {
        const isContainer = stageElement.uiType === mCore.enumerator.ui.UI_ELEMENT.CONTAINER;
        const isText = stageElement.uiType === mCore.enumerator.ui.UI_ELEMENT.LABEL ||
            stageElement.uiType === mCore.enumerator.ui.UI_ELEMENT.TEXT_FIELD;

        const commonProps = {
            [STAGE_ELEMENT_PROP.POSITION]: generatePoint(stageElement.position, DIMENSION_FORMATS, stageElement.userData.isRoot),
            [STAGE_ELEMENT_PROP.SIZE]: generatePoint(stageElement.rate, DIMENSION_FORMATS, isContainer),
            [STAGE_ELEMENT_PROP.SKEW]: generatePoint(stageElement.skew, DEGREE_FORMATS),
            [STAGE_ELEMENT_PROP.SCALE]: generatePoint(stageElement.scale, PERCENT_FORMATS),
            [STAGE_ELEMENT_PROP.ANCHOR]: generatePoint(stageElement.anchor, PERCENT_FORMATS, isContainer),
            [STAGE_ELEMENT_PROP.INTERACTIVE]: generateCheckbox(stageElement.userData.interactive),
            [STAGE_ELEMENT_PROP.VISIBLE]: generateCheckbox(stageElement.visible),
            [STAGE_ELEMENT_PROP.ROTATION]: generateSlider(stageElement.rotation, VALUE_FORMAT.DEGREE, math.FULL_CIRCLE - 1),
            [STAGE_ELEMENT_PROP.TINT]: generateColor(stageElement.tint),
            [STAGE_ELEMENT_PROP.ALPHA]: generateSlider(stageElement.alpha, VALUE_FORMAT.PERCENT, math.MAX_PERCENT)
        };

        const textProps = isText ? {
            [STAGE_ELEMENT_PROP.FONT_COLOR]: generateColor(stageElement.color),
            [STAGE_ELEMENT_PROP.FONT_SIZE]: generateNumber(stageElement.fontSize, VALUE_FORMAT.PIXEL),
            [STAGE_ELEMENT_PROP.TEXT_ALIGN]: generateTextAlign(stageElement.horizontalAlign - 1, stageElement.verticalAlign - 1),
            [STAGE_ELEMENT_PROP.TEXT_OUTLINE_ENABLED]: generateEnabled(stageElement.outlineEnabled),
            [STAGE_ELEMENT_PROP.TEXT_OUTLINE_SIZE]: generateNumber(stageElement.outlineSize, VALUE_FORMAT.PIXEL),
            [STAGE_ELEMENT_PROP.TEXT_OUTLINE_COLOR]: generateColor(stageElement.outlineColor),
            [STAGE_ELEMENT_PROP.TEXT_SHADOW_ENABLED]: generateEnabled(stageElement.shadowEnabled),
            [STAGE_ELEMENT_PROP.TEXT_SHADOW_SIZE]: generatePoint(stageElement.getShadowOffset(), [VALUE_FORMAT.PIXEL]),
            [STAGE_ELEMENT_PROP.TEXT_SHADOW_COLOR]: generateColor(stageElement.shadowColor)
        } : {};

        return {
            ...state,
            file: {
                ...state.file,
                name: stageElement.name,
                isDirectory: false,
                isStageElement: true,
                isRoot: stageElement.userData.isRoot,
                sectionId: stageElement.uiType,
                id: stageElement.uid,
                type: stageElement.uiType,
                data: {isText, ...commonProps, ...textProps}
            }
        };
    },
    [STATE.CHANGE_STAGE_ELEMENT]: (state, {key, value}) => {
        let nextFileData = {};
        let nextFile = {};

        if (key === STAGE_ELEMENT_PROP.NAME) {
            nextFile[key] = value;
        } else {
            nextFileData[key] = updateValue(state, key, value);
        }

        return {
            ...state,
            file: {
                ...state.file,
                ...nextFile,
                data: {
                    ...state.file.data,
                    ...nextFileData
                }
            }
        };
    }
};

function checkSelectedElement(file, id, sectionId) {
    return file !== null && file.id === id && file.sectionId === sectionId;
}

export default function topMenuReducer(state = initialState, action) {
    return handleAction(state, actionHandlers, action);
}
