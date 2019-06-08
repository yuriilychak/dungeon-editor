import topMenuReducer from "./top-menu/reducer";
import newProjectDialogReducer from "./new-project-dialog/reducer";
import renameFileDialogReducer from "./rename-file-dialog/reducer";
import exportProjectDialogReducer from "./export-project-dialog/reducer";
import libraryReducer from "./library/reducer";
import { createStore, combineReducers } from 'redux';

/**
 * @typedef {Object}
 * @name ActionData
 * @property {string} type
 * @property {*} payload
 */

const store = createStore(combineReducers({
    topMenu: topMenuReducer,
    library: libraryReducer,
    renameFileDialog: renameFileDialogReducer,
    exportProjectDialog: exportProjectDialogReducer,
    newProjectDialog: newProjectDialogReducer
}));

export default store;
