import STATE from "../state";

export const showExportProjectDialog = () => changeDialogActivity(true);
export const hideExportProjectDialog = () => changeDialogActivity(false);


const changeDialogActivity = activity => ({
        type: STATE.CHANGE_ACTIVITY,
        payload: activity
});
