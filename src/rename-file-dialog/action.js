import STATE from "./state";

export const showRenameFileDialog = () => changeDialogActivity(true);
export const hideRenameFileDialog = () => changeDialogActivity(false);

const changeDialogActivity = activity => ({
    type: STATE.CHANGE_ACTIVITY,
    payload: activity
});
