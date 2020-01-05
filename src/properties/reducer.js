import StaticData from "./data";
import STATE from "./state";
import { handleAction } from "../helpers";

const { mCore } = window;

const { color, math } = mCore.util;

export const initialState = {
    ...StaticData,
    file: null
};

const generatePoint = (x, y, isPercentOnly = false, isDegrees = false) => ({
    x: Math.round(x),
    y: Math.round(y),
    isPercentOnly,
    isDegrees
});

const updatePoint = (state, key, x, y) => {
    const nextX = Math.round(x);
    const nextY = Math.round(y);
    const point = state.file.data[key];

    return point.x !== nextX || point.y !== nextY ? {
        ...point,
        x: nextX,
        y: nextY
    } : point;
};

const actionHandlers = {
    [STATE.SELECT_LIBRARY_ELEMENT]: (state, file) => ({ ...state, file: {...file, isStageElement: false } }),
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
        return {
            ...state,
            file: {
                ...state.file,
                name: stageElement.name,
                isDirectory: false,
                isStageElement: true,
                sectionId: stageElement.uiType,
                id: stageElement.uid,
                data: {
                    position: generatePoint(stageElement.position.x, stageElement.position.y),
                    size: generatePoint(stageElement.rate.x, stageElement.rate.y),
                    skew: generatePoint(
                        Math.floor(math.toDegrees(stageElement.skew.x)),
                        Math.floor(math.toDegrees(stageElement.skew.y)),
                        false,
                        true
                    ),
                    scale: generatePoint(
                        Math.floor(math.floatToPercent(stageElement.scale.x)),
                        Math.floor(math.floatToPercent(stageElement.scale.y)),
                        true,
                        false
                    ),
                    anchor: generatePoint(
                        Math.floor(math.floatToPercent(stageElement.anchor.x)),
                        Math.floor(math.floatToPercent(stageElement.anchor.y)),
                        true,
                        false
                    ),
                    interactive: stageElement.userData.interactive,
                    visible: stageElement.visible,
                    rotation: Math.floor((fullCircle - math.toDegrees(stageElement.rotation)) % fullCircle),
                    tint: color.intToHex(stageElement.tint),
                    alpha: Math.floor(math.floatToPercent(stageElement.alpha))
                }
            }
        };
    },
    [STATE.CHANGE_STAGE_ELEMENT]: (state, { key, value }) => {
        let nextFileData = {};

        switch (key) {
            case "position": {
                nextFileData[key] = updatePoint(state, key, value.x, value.y);
                break;
            }
            case "size": {
                nextFileData[key] = updatePoint(state, key, value.x, value.y);
                break;
            }
            case "anchor": {
                nextFileData[key] = updatePoint(state, key, math.floatToPercent(value.x), math.floatToPercent(value.y));
                break;
            }
            case "scale": {
                nextFileData[key] = updatePoint(state, key, math.floatToPercent(value.x), math.floatToPercent(value.y));
                break;
            }
            case "skew": {
                nextFileData[key] = updatePoint(state, key, math.toDegrees(value.x), math.toDegrees(value.y));
                break;
            }
            case "rotation": {
                const fullCircle = math.multPowTwo(math.HALF_CIRCLE);
                nextFileData[key] = Math.floor((fullCircle - math.toDegrees(value)) % fullCircle);
                break;
            }
            case "alpha": {
                nextFileData[key] = Math.floor(math.floatToPercent(value));
                break;
            }
            case "visible": {
                nextFileData[key] = value;
                break;
            }
            case "interactive": {
                nextFileData[key] = value;
                break;
            }
            case "tint": {
                nextFileData[key] = color.intToHex(value);
                break;
            }
            default:
        }

        return {
            ...state,
            file: {
                ...state.file,
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
