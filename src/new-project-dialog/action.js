import STATE from "./state";
import {handleAction} from "../helpers";

export const showNewProjectDialog = () => changeDialogActivity(true);
export const hideNewProjectDialog = () => changeDialogActivity(false);

const changeDialogActivity = activity => handleAction(STATE.CHANGE_ACTIVITY, activity);
