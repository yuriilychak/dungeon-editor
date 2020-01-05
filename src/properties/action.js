import STATE from "./state";
import { dispatchAction } from "../helpers";

export const selectLibraryElement = fileData => dispatchAction(STATE.SELECT_LIBRARY_ELEMENT, fileData);
export const deleteLibraryElement = (ids, sectionId) => dispatchAction(STATE.DELETE_LIBRARY_ELEMENT, {ids, sectionId});
export const renameLibraryElement = (id, sectionId, name) => dispatchAction(STATE.RENAME_LIBRARY_ELEMENT, {id, sectionId, name});
export const selectStageElement = element => dispatchAction(STATE.SELECT_STAGE_ELEMENT, element);
export const changeStageElement = data => dispatchAction(STATE.CHANGE_STAGE_ELEMENT, data);
