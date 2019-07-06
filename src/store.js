import TopMenuReducer from "./top-menu/reducer";
import newProjectDialogReducer from "./new-project-dialog/reducer";
import renameFileDialogReducer from "./rename-file-dialog/reducer";
import exportProjectDialogReducer from "./export-project-dialog/reducer";
import libraryReducer from "./library/reducer";
import propertiesReducer from "./properties/reducer";
import workingAreaReducer from "./working-area/reducer";
import { createStore, combineReducers } from 'redux';

/**
 * @typedef {Object}
 * @name ActionData
 * @property {string} type
 * @property {*} payload
 */

const store = createStore(combineReducers({
    topMenu: TopMenuReducer,
    library: libraryReducer,
    properties: propertiesReducer,
    renameFileDialog: renameFileDialogReducer,
    exportProjectDialog: exportProjectDialogReducer,
    newProjectDialog: newProjectDialogReducer,
    workingArea: workingAreaReducer
}));

export default store;
