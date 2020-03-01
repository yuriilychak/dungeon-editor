import STATE from "./state";
import {handleAction} from "../helpers";

export const showNewFileDialog = sectionId => handleAction(STATE.OPEN_POPUP, sectionId);
export const hideNewFileDialog = () => handleAction(STATE.CLOSE_POPUP);
export const changeElementType = typeId => handleAction(STATE.CHANGE_TYPE, typeId);
