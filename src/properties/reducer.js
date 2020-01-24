import StaticData from "./data";
import STATE from "./state";
import {handleAction} from "../helpers";
import {STAGE_ELEMENT_PROP} from "../enum";

import {
    updateValue,
    generateSection,
} from "./helpers";
import {PROPERTY_SECTION} from "./constants";

const {mCore} = window;

export const initialState = {
    ...StaticData,
    disabledStageProps: [],
    storedInfo: {
        stage: {},
        library: {}
    },
    currentInfo: null,
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

        let currentInfo = state.storedInfo.stage[stageElement.uid];

        if (!currentInfo)  {
            currentInfo = {
                id: stageElement.uid,
                sectionId: PROPERTY_SECTION.NONE
            };
        }

        let sections = [PROPERTY_SECTION.COMMON];

        if (isText) {
            sections.push(PROPERTY_SECTION.TEXT);
        }

        const disabledStageProps = [];

        if (isContainer) {
            disabledStageProps.push(STAGE_ELEMENT_PROP.SIZE);
            disabledStageProps.push(STAGE_ELEMENT_PROP.ANCHOR);
        }

        if (stageElement.userData.isRoot) {
            disabledStageProps.push(STAGE_ELEMENT_PROP.POSITION);
        }

        const commonProps = generateSection(state.elementProperties.common, stageElement, disabledStageProps);

        const textProps = isText ? generateSection(state.elementProperties.text, stageElement, disabledStageProps) : {};

        return {
            ...state,
            currentInfo,
            storedInfo: {
                ...state.storedInfo,
                stage: {
                    ...state.storedInfo.stage,
                    [stageElement.uid]: currentInfo
                }
            },
            file: {
                ...state.file,
                name: stageElement.name,
                isDirectory: false,
                isStageElement: true,
                isRoot: stageElement.userData.isRoot,
                sectionId: stageElement.uiType,
                id: stageElement.uid,
                type: stageElement.uiType,
                data: {sections, ...commonProps, ...textProps}
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
    },
    [STATE.CHANGE_SELECTED_SECTION]: (state, sectionId) => {
        const currentInfo = {
            ...state.currentInfo,
            sectionId
        };
        return {
            ...state,
            currentInfo,
            storedInfo: {
                ...state.storedInfo,
                stage: {
                    ...state.storedInfo.stage,
                    [currentInfo.id]: currentInfo
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
