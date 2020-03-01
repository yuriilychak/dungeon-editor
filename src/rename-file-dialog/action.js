import STATE from "./state";
import { handleAction } from "../helpers";

export const showRenameFileDialog = () => changeDialogActivity(true);
export const hideRenameFileDialog = () => changeDialogActivity(false);

const changeDialogActivity = activity => handleAction(STATE.CHANGE_ACTIVITY, activity);
