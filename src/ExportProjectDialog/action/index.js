import STATE from "../state";

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

export const changeProgress = (progress, fileName = null, isComplete = false) => ({
        type: STATE.PROGRESS,
        payload: {
            progress,
            fileName,
            isComplete
        }
});

/**
 * @param {boolean} activity
 * @return {ActionData}
 */

const changeDialogActivity = activity => ({
        type: STATE.CHANGE_ACTIVITY,
        payload: activity
});
