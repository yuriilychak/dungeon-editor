import state from "../state";

/**
 * @function
 * @param {ElementData} data
 * @return {ActionData}
 */

export const addElement = data => ({
    type: state.ADD_ELEMENT,
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
 * @param {TextureData} data
 * @return {ActionData}
 */

export const addParticle = data => ({
    type: state.ADD_PARTICLE,
    payload: data
});

/**
 * @function
 * @param {TextureData} data
 * @return {ActionData}
 */

export const addSkeleton = data => ({
    type: state.ADD_SKELETON,
    payload: data
});

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

export const removeElement = id => ({
    type: state.REMOVE_ELEMENT,
    payload: id
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

export const removeParticle = id => ({
    type: state.REMOVE_PARTICLE,
    payload: id
});

/**
 * @function
 * @param {number} id
 * @return {ActionData}
 */

export const removeSkeleton = id => ({
    type: state.REMOVE_SKELETON,
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
