import STATE from "./state";

export const addTab = (title, fileId, sectionId) => tabAction(STATE.TAB_ADD, { title, fileId, sectionId });
export const selectTab = index => tabAction(STATE.TAB_SELECT, index);
export const closeTab = index => tabAction(STATE.TAB_CLOSE, index);
export const zoomChange = zoom => tabAction(STATE.ZOOM_CHANGE, zoom);
export const checkRename = (fileId, sectionId, title) => tabAction(STATE.CHECK_RENAME, { fileId, sectionId, title });
export const checkDelete = (fileId, sectionId) => tabAction(STATE.CHECK_DELETE, { fileId, sectionId });
export const transformReset = () => tabAction(STATE.TRANSFORM_RESET);

const tabAction = (type, payload = null) => ({ type, payload });
