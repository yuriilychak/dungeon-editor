import { createStore, combineReducers } from 'redux';

import { JSON_DATA } from "./loader";
import { UI_SECTION } from "./enum";
import TopMenuReducer from "./top-menu/reducer";
import bottomMenuReducer from "./bottom-menu/reducer";
import newFileDialogReducer from "./new-file-dialog/reducer";
import newProjectDialogReducer from "./new-project-dialog/reducer";
import renameFileDialogReducer from "./rename-file-dialog/reducer";
import exportProjectDialogReducer from "./export-project-dialog/reducer";
import libraryReducer from "./library/reducer";
import propertiesReducer from "./properties/reducer";
import workingAreaReducer from "./working-area/reducer";

/**
 * @typedef {Object}
 * @name ActionData
 * @property {string} type
 * @property {*} payload
 */

const initStore = () => {
    const content = {
        [UI_SECTION.TOP_MENU]: TopMenuReducer,
        [UI_SECTION.BOTTOM_MENU]: bottomMenuReducer,
        [UI_SECTION.LIBRARY]: libraryReducer,
        [UI_SECTION.PROPERTIES]: propertiesReducer,
        [UI_SECTION.RENAME_FILE_DIALOG]: renameFileDialogReducer,
        [UI_SECTION.EXPORT_PROJECT_DIALOG]: exportProjectDialogReducer,
        [UI_SECTION.NEW_FILE_DIALOG]: newFileDialogReducer,
        [UI_SECTION.NEW_PROJECT_DIALOG]: newProjectDialogReducer,
        [UI_SECTION.WORKING_AREA]: workingAreaReducer
    };

    const sectionIds = Object.values(UI_SECTION);
    const sectionKeys = Object.keys(UI_SECTION);

    const reducers = {};

    sectionIds.forEach((sectionId, index) => {
        const { definedState, handlers } = content[sectionId];
        const initialState = {
            ...definedState,
            ...JSON_DATA[sectionId]
        };
        reducers[sectionId] = (state = initialState, { type, payload })  => {
            if (type.indexOf(sectionKeys[index]) !== 0) {
                return state;
            }
            const handler = handlers[type];
            return handler ? handler(state, payload) : state;
        };
    });

    return createStore(combineReducers(reducers));
};

export default initStore;
