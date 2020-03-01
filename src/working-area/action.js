import STATE from "./state";
import {handleAction} from "../helpers";

export const addTab = (title, fileId, sectionId) => handleAction(STATE.TAB_ADD, { title, fileId, sectionId });
export const selectTab = index => handleAction(STATE.TAB_SELECT, index);
export const closeTab = index => handleAction(STATE.TAB_CLOSE, index);
export const zoomChange = zoom => handleAction(STATE.ZOOM_CHANGE, zoom);
export const checkRename = (fileId, sectionId, title) => handleAction(STATE.CHECK_RENAME, { fileId, sectionId, title });
export const checkDelete = (fileIds, sectionId) => handleAction(STATE.CHECK_DELETE, { fileIds, sectionId });
export const transformReset = () => handleAction(STATE.TRANSFORM_RESET);
export const changeMode = () => handleAction(STATE.CHANGE_MODE);
