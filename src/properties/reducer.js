import {get} from "lodash";

import StaticData from "./data";
import STATE from "./state";
import {handleAction} from "../helpers";
import {STAGE_ELEMENT_PROP} from "../enum";
import {PROPERTY_SECTION} from "./constants";
import {
    updateValue,
    generateSection,
    updateSelectedSection,
    updateFile
} from "./helpers";

export const initialState = {
    ...StaticData,
    storedInfo: {
        stage: {},
        library: {}
    },
    currentInfo: null,
    file: null
};

const actionHandlers = {
    [STATE.SELECT_LIBRARY_ELEMENT]: (state, file) => updateFile(state, { ...file, isStageElement: false, isRoot: false }),
    [STATE.DELETE_LIBRARY_ELEMENT]: (state, {ids, sectionId}) =>
        ids.some(id => checkSelectedElement(state.file, id, sectionId)) ? updateFile(state) : state,
    [STATE.RENAME_LIBRARY_ELEMENT]: (state, {id, sectionId, name}) =>
        checkSelectedElement(state.file, id, sectionId) ? updateFile(state, { name }) : state,
    [STATE.SELECT_STAGE_ELEMENT]: (state, stageElement) => {
        const sectionId = stageElement.uiType;
        const id = stageElement.uid;

        let currentInfo = state.storedInfo.stage[id];

        if (!currentInfo)  {
            currentInfo = { id, sectionId: get(state.currentInfo, "sectionId", PROPERTY_SECTION.NONE) };
        }

        const disabledStageProps = [ ...state.stageElementDisabled[sectionId] ];


        if (stageElement.userData.isRoot) {
            disabledStageProps.push(STAGE_ELEMENT_PROP.POSITION);
        }

        const sections = state.stageElementSections[sectionId];

        let props = {};

        sections.forEach(key => {
            props = {
                ...props,
                ...generateSection(state.elementProperties[key], stageElement, disabledStageProps)
            }
        });

        const nextFile = {
            compressName: false,
            name: stageElement.name,
            isDirectory: false,
            isStageElement: true,
            isRoot: stageElement.userData.isRoot,
            sectionId,
            id,
            type: sectionId
        };
        const nextFileData = {
            sections,
            ...props
        };

        return updateFile(updateSelectedSection(state, currentInfo), nextFile, nextFileData);
    },
    [STATE.CHANGE_STAGE_ELEMENT]: (state, {key, value}) => {
        let nextFileData = {};
        let nextFile = {};

        if (key === STAGE_ELEMENT_PROP.NAME) {
            nextFile[key] = value;
        } else {
            nextFileData[key] = updateValue(state, key, value);
        }

        return updateFile(state, nextFile, nextFileData);
    },
    [STATE.CHANGE_SELECTED_SECTION]: (state, sectionId) => {
        const currentInfo = {
            ...state.currentInfo,
            sectionId
        };
        return updateSelectedSection(state, currentInfo);
    }
};

function checkSelectedElement(file, id, sectionId) {
    return file !== null && file.id === id && file.sectionId === sectionId;
}

export default function topMenuReducer(state = initialState, action) {
    return handleAction(state, actionHandlers, action);
}
