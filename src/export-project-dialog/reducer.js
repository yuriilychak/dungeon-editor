import STATE from "./state";
import {generateReducerData} from "../helpers";

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
 * @param {ExportProjectDialogState} state
 * @param {ActionData} action
 * @return {ExportProjectDialogState}
 */

export default generateReducerData(
    {
        isPopupOpen: false,
        progressData: null
    },
    {
        [STATE.CHANGE_ACTIVITY]: (state, isPopupOpen) => ({
            ...state,
            isPopupOpen,
            progressData: null
        }),
        [STATE.PROGRESS]: (state, progressData) => ({ ...state, progressData })
    }
);
