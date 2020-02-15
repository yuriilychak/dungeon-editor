import {get} from "lodash";

import STATE from "./state";
import {STAGE_ELEMENT_PROP} from "../enum";
import {PROPERTY_SECTION} from "./constants";
import {generateReducerData} from "../helpers";
import {
    updateValue,
    generateSection,
    updateSelectedSection,
    updateFile
} from "./helpers";

const { mCore } = window;


function checkSelectedElement(file, id, sectionId) {
    return file !== null && file.id === id && file.sectionId === sectionId;
}

export default generateReducerData(
    {
        storedInfo: {
            stage: {},
            library: {}
        },
        currentInfo: null,
        file: null
    },
    {
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
                disabledStageProps.push(...state.rootDisabled);
            } else if (stageElement.parent.uiType === mCore.enumerator.ui.UI_ELEMENT.CONTAINER) {
                disabledStageProps.push(...state.layoutDisabled);
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
        [STATE.CHANGE_STAGE_ELEMENT]: (state, changedValues) => {
            const nextFileData = {};
            const nextFile = {};

            changedValues.forEach(({ key, value }) => {
                if (key === STAGE_ELEMENT_PROP.NAME) {
                    nextFile[key] = value;
                } else {
                    nextFileData[key] = updateValue(state, key, value);
                }
            });

            return updateFile(state, nextFile, nextFileData);
        },
        [STATE.CHANGE_SELECTED_SECTION]: (state, sectionId) => {
            const currentInfo = {
                ...state.currentInfo,
                sectionId
            };
            return updateSelectedSection(state, currentInfo);
        }
    }
);
