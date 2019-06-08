import topMenuReducer from "./top-menu/reducer";
import newProjectDialogReducer from "./new-project-dialog/reducer";
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
    libraryReducer: libraryReducer,
    exportProjectDialog: exportProjectDialogReducer,
    newProjectDialog: newProjectDialogReducer
}));

export default store;
