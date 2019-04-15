import NEW_PROJECT_DIALOG from "../state";

export const showNewProjectDialog = () => ({
    type: NEW_PROJECT_DIALOG.CHANGE_ACTIVITY,
    payload: true
});

export const changeDialogVisible = activity => ({
    type: NEW_PROJECT_DIALOG.CHANGE_ACTIVITY,
    payload: activity
});
