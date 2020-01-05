import STATE from "./state";
import StaticData from "./data";
import { handleAction } from "../helpers";

/**
 * @typedef {Object}
 * @name ProgressData
 * @property {number} progress
 * @property {string} fileName
 * @property {boolean} isComplete
 */

/**
 * @typedef {Object}
 * @name ExportProjectDialogState
 * @property {Object.<string, string>} locale
 * @property {boolean} isPopupOpen
 * @property {?ProgressData} progressData
 */

/**
 * @type {ExportProjectDialogState}
 */

export const initialState = {
    ...StaticData,
    isPopupOpen: false,
    progressData: null
};

/**
 * @type {Object.<string, function(ExportProjectDialogState, ActionData): ExportProjectDialogState>}
 */

const actionHandlers = {
    [STATE.CHANGE_ACTIVITY]: (state, isPopupOpen) => ({
        ...state,
        isPopupOpen,
        progressData: null
    }),
    [STATE.PROGRESS]: (state, progressData) => ({ ...state, progressData })
};

/**
 * @param {ExportProjectDialogState} state
 * @param {ActionData} action
 * @return {ExportProjectDialogState}
 */

export default function topMenuReducer(state = initialState, action) {
    return handleAction(state, actionHandlers, action);
}
