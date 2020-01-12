import StaticData from "./data";
import STATE from "./state";
import { handleAction } from "../helpers";
import {STAGE_ELEMENT_PROP} from "../enum";
import {DEGREE_FORMATS, DIMENSION_FORMATS, PERCENT_FORMATS, VALUE_FORMAT} from "./constants";
import {
    generateSlider,
    generateCheckbox,
    generatePoint,
    generateColor,
    generateNumber,
    generateTextAlign,
    updatePoint
} from "./helpers";

const { mCore } = window;

const { math } = mCore.util;

export const initialState = {
    ...StaticData,
    file: null
};

const actionHandlers = {
    [STATE.SELECT_LIBRARY_ELEMENT]: (state, file) => ({ ...state, file: {...file, isStageElement: false, isRoot: false } }),
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
        const fullCircle = math.multPowTwo(math.HALF_CIRCLE);
        const isContainer = stageElement.uiType === mCore.enumerator.ui.UI_ELEMENT.CONTAINER;
        const isText = stageElement.uiType === mCore.enumerator.ui.UI_ELEMENT.LABEL ||
            stageElement.uiType === mCore.enumerator.ui.UI_ELEMENT.TEXT_FIELD;

        const commonProps = {
            position: generatePoint(
                stageElement.position.x,
                stageElement.position.y,
                DIMENSION_FORMATS,
                stageElement.userData.isRoot
            ),
            size: generatePoint(
                stageElement.rate.x,
                stageElement.rate.y,
                DIMENSION_FORMATS,
                isContainer
            ),
            skew: generatePoint(
                Math.floor(math.toDegrees(stageElement.skew.x)),
                Math.floor(math.toDegrees(stageElement.skew.y)),
                DEGREE_FORMATS
            ),
            scale: generatePoint(
                math.floatToPercent(stageElement.scale.x, true),
                math.floatToPercent(stageElement.scale.y, true),
                PERCENT_FORMATS
            ),
            anchor: generatePoint(
                math.floatToPercent(stageElement.anchor.x, true),
                math.floatToPercent(stageElement.anchor.y, true),
                PERCENT_FORMATS,
                isContainer
            ),
            interactive: generateCheckbox(stageElement.userData.interactive),
            visible: generateCheckbox(stageElement.visible),
            rotation: generateSlider(
                Math.floor((fullCircle - math.toDegrees(stageElement.rotation)) % fullCircle),
                VALUE_FORMAT.DEGREE,
                359
            ),
            tint: generateColor(stageElement.tint),
            alpha: generateSlider(
                Math.floor(math.floatToPercent(stageElement.alpha)),
                VALUE_FORMAT.PERCENT,
                100
            )
        };

        const textProps = isText ? {
            fontColor: generateColor(stageElement.color),
            fontSize: generateNumber(stageElement.fontSize, VALUE_FORMAT.PIXEL),
            textAlign: generateTextAlign(stageElement.horizontalAlign - 1, stageElement.verticalAlign - 1)
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
                data: { isText, ...commonProps, ...textProps }
            }
        };
    },
    [STATE.CHANGE_STAGE_ELEMENT]: (state, { key, value }) => {
        let nextFileData = {};
        let nextFile = {};

        switch (key) {
            case STAGE_ELEMENT_PROP.POSITION: {
                nextFileData[key] = updatePoint(state, key, value.x, value.y);
                break;
            }
            case STAGE_ELEMENT_PROP.SIZE: {
                nextFileData[key] = updatePoint(state, key, value.x, value.y);
                break;
            }
            case STAGE_ELEMENT_PROP.ANCHOR: {
                nextFileData[key] = updatePoint(state, key, math.floatToPercent(value.x), math.floatToPercent(value.y));
                break;
            }
            case STAGE_ELEMENT_PROP.SCALE: {
                nextFileData[key] = updatePoint(state, key, math.floatToPercent(value.x), math.floatToPercent(value.y));
                break;
            }
            case STAGE_ELEMENT_PROP.SKEW: {
                nextFileData[key] = updatePoint(state, key, math.toDegrees(value.x), math.toDegrees(value.y));
                break;
            }
            case STAGE_ELEMENT_PROP.ROTATION: {
                const fullCircle = math.multPowTwo(math.HALF_CIRCLE);
                nextFileData[key] = generateSlider(
                    Math.floor((fullCircle - math.toDegrees(value)) % fullCircle),
                    VALUE_FORMAT.DEGREE,
                    359
                );
                break;
            }
            case STAGE_ELEMENT_PROP.ALPHA: {
                nextFileData[key] = generateSlider(
                    Math.floor(math.floatToPercent(value)),
                    VALUE_FORMAT.PERCENT,
                    100
                );
                break;
            }
            case STAGE_ELEMENT_PROP.VISIBLE: {
                nextFileData[key] = generateCheckbox(value);
                break;
            }
            case STAGE_ELEMENT_PROP.INTERACTIVE: {
                nextFileData[key] = generateCheckbox(value);
                break;
            }
            case STAGE_ELEMENT_PROP.TINT: {
                nextFileData[key] = generateColor(value);
                break;
            }
            case STAGE_ELEMENT_PROP.FONT_COLOR: {
                nextFileData[key] = generateColor(value);
                break;
            }
            case STAGE_ELEMENT_PROP.FONT_SIZE: {
                nextFileData[key] = generateNumber(value, VALUE_FORMAT.PIXEL);
                break;
            }
            case STAGE_ELEMENT_PROP.TEXT_ALIGN: {
                nextFileData[key] = generateTextAlign(value.x, value.y);
                break;
            }
            case STAGE_ELEMENT_PROP.NAME: {
                nextFile[key] = value;
                break;
            }
            default:
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
