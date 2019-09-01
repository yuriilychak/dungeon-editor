import STATE from "./state";

import { createAction } from "../helpers";

export const openElement = (fileId, sectionId) => createAction(STATE.OPEN_ELEMENT, { fileId, sectionId });
export const deleteElement = (fileId, sectionId) => createAction(STATE.DELETE_ELEMENT, { fileId, sectionId });
export const closeElement = (fileId, sectionId) => createAction(STATE.CLOSE_ELEMENT, { fileId, sectionId });
export const changeTab = tabIndex => createAction(STATE.CHANGE_TAB, tabIndex);
