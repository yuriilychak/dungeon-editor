import STATE from "./state";
import { dispatchAction } from "../helpers";

export const showRenameFileDialog = () => changeDialogActivity(true);
export const hideRenameFileDialog = () => changeDialogActivity(false);

const changeDialogActivity = activity => dispatchAction(STATE.CHANGE_ACTIVITY, activity);
