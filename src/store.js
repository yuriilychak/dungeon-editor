import topMenuReducer from "./TopMenu/reducer";
import newProjectDialogReducer from "./NewProjectDialog/reducer";
import exportProjectDialogReducer from "./ExportProjectDialog/reducer";
import { createStore, combineReducers } from 'redux';

/**
 * @typedef {Object}
 * @name ActionData
 * @property {string} type
 * @property {*} payload
 */

const store = createStore(combineReducers({
    topMenu: topMenuReducer,
    exportProjectDialog: exportProjectDialogReducer,
    newProjectDialog: newProjectDialogReducer
}));

export default store;
