import STATE from "./state";

export const showNewProjectDialog = () => changeDialogActivity(true);
export const hideNewProjectDialog = () => changeDialogActivity(false);

const changeDialogActivity = activity => ({
    type: STATE.CHANGE_ACTIVITY,
    payload: activity
});
