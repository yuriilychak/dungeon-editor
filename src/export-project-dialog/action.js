import STATE from "./state";
import {handleAction} from "../helpers";

/**
 * @return {ActionData}
 */

export const showExportProjectDialog = () => changeDialogActivity(true);

/**
 * @return {ActionData}
 */

export const hideExportProjectDialog = () => changeDialogActivity(false);

/**
 * @param {number} progress
 * @param {?string} [fileName = null]
 * @param {boolean} [isComplete = false]
 * @return {ActionData}
 */

export const changeProgress = ({ progress, fileName = null, isComplete = false }) => handleAction(
    STATE.PROGRESS, {
        progress,
        fileName,
        isComplete
    });

/**
 * @param {boolean} activity
 * @return {ActionData}
 */

const changeDialogActivity = activity => handleAction(STATE.CHANGE_ACTIVITY, activity);
