import state from "../state";

/**
 * @function
 * @param {TextureData} data
 * @return {ActionData}
 */

export const addTexture = data => ({
    type: state.ADD_TEXTURE,
    payload: data
});

/**
 * @function
 * @param {TextureData} data
 * @return {ActionData}
 */

export const addFont = data => ({
    type: state.ADD_FONT,
    payload: data
});

/**
 * @function
 * @param {number} id
 * @return {ActionData}
 */

export const removeFont = id => ({
    type: state.REMOVE_FONT,
    payload: id
});

/**
 * @function
 * @param {number} id
 * @return {ActionData}
 */

export const removeTexture = id => ({
    type: state.REMOVE_TEXTURE,
    payload: id
});

/**
 * @function
 * @return {ActionData}
 */

export const clearLibrary = () => ({
        type: state.CLEAR,
        payload: null
});
