import state from "../state";


/**
 * @function
 * @param {TextureData} data
 * @return {ActionData}
 */

export const addFile = (data, sectionId) => ({
    type: state.ADD_FILE,
    payload: {
        data,
        sectionId
    }
});

/**
 * @function
 * @param {number} id
 * @param {number} sectionId
 * @return {ActionData}
 */

export const removeFile = (id, sectionId) => ({
    type: state.REMOVE_FILE,
    payload: {
        id,
        sectionId
    }
});

/**
 * @function
 * @param {Object[]} fileTree
 * @param {number} sectionId
 * @return {ActionData}
 */

export const updateTree = (fileTree, sectionId) => ({
    type: state.UPDATE_TREE,
    payload: {
        fileTree,
        sectionId
    }
});

/**
 * @function
 * @param {Object} data
 * @param {number} sectionId
 * @return {ActionData}
 */

export const addDirectory = (sectionId, data) => ({
    type: state.ADD_DIRECTORY,
    payload: {
        data,
        sectionId
    }
});

/**
 * @function
 * @return {ActionData}
 */

export const clearLibrary = () => ({
        type: state.CLEAR,
        payload: null
});
