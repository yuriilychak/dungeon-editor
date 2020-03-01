import STATE from "./state";
import { handleAction } from "../helpers";

export const selectLibraryElement = fileData => handleAction(STATE.SELECT_LIBRARY_ELEMENT, fileData);
export const deleteLibraryElement = (ids, sectionId) => handleAction(STATE.DELETE_LIBRARY_ELEMENT, {ids, sectionId});
export const renameLibraryElement = (id, sectionId, name) => handleAction(STATE.RENAME_LIBRARY_ELEMENT, {id, sectionId, name});
export const selectStageElement = element => handleAction(STATE.SELECT_STAGE_ELEMENT, element);
export const changeStageElement = data => handleAction(STATE.CHANGE_STAGE_ELEMENT, data);
export const changeSelectedSection = sectionId => handleAction(STATE.CHANGE_SELECTED_SECTION, sectionId);
