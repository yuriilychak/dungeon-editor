import TopMenuReducer from "./top-menu/reducer";
import bottomMenuReducer from "./bottom-menu/reducer";
import newFileDialogReducer from "./new-file-dialog/reducer";
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
    bottomMenu: bottomMenuReducer,
    library: libraryReducer,
    properties: propertiesReducer,
    renameFileDialog: renameFileDialogReducer,
    exportProjectDialog: exportProjectDialogReducer,
    newFileDialog: newFileDialogReducer,
    newProjectDialog: newProjectDialogReducer,
    workingArea: workingAreaReducer
}));

export default store;
