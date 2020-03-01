import STATE from "./state";

import { handleAction } from "../helpers";

export const openElement = (fileId, sectionId) => handleAction(STATE.OPEN_ELEMENT, { fileId, sectionId });
export const deleteElement = (fileId, sectionId) => handleAction(STATE.DELETE_ELEMENT, { fileId, sectionId });
export const closeElement = (fileId, sectionId) => handleAction(STATE.CLOSE_ELEMENT, { fileId, sectionId });
export const changeTab = tabIndex => handleAction(STATE.CHANGE_TAB, tabIndex);
