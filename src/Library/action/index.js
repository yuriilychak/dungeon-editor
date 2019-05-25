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
 * @return {ActionData}
 */

export const clearLibrary = () => ({
        type: state.CLEAR,
        payload: null
});
