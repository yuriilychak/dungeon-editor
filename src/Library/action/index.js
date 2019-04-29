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
 * @param {number} id
 * @return {ActionData}
 */

export const removeTexture = id => ({
    type: state.REMOVE_TEXTURE,
    payload: id
});
