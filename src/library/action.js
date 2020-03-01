import state from "./state";
import { handleAction } from "../helpers";


/**
 * @function
 * @param {TextureData} data
 * @return {ActionData}
 */

export const addFile = (data, sectionId) => handleAction(state.ADD_FILE, { data, sectionId });

/**
 * @function
 * @param {number} id
 * @param {number} sectionId
 * @return {ActionData}
 */

export const renameFile = (id, sectionId, name) => handleAction(state.RENAME_FILE, { id, sectionId, name });


/**
 * @function
 * @param {number} id
 * @param {number} sectionId
 * @return {ActionData}
 */

export const removeFile = (id, sectionId) => handleAction(state.REMOVE_FILE, { id, sectionId });

/**
 * @function
 * @param {Object[]} fileTree
 * @param {number} sectionId
 * @return {ActionData}
 */

export const updateTree = (fileTree, sectionId) => handleAction(state.UPDATE_TREE, { fileTree, sectionId });

/**
 * @function
 * @param {Object} data
 * @param {number} sectionId
 * @return {ActionData}
 */

export const addDirectory = (sectionId, data) => handleAction(state.ADD_DIRECTORY, { data, sectionId });

/**
 * @function
 * @return {ActionData}
 */

export const clearLibrary = () => handleAction(state.CLEAR);

export const changeSelectedSection = selectedId => handleAction(state.CHANGE_SELECTED_SECTION, selectedId);
