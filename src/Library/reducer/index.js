import StaticData from "../data/index";
import STATE from "../state";

/**
 * @typedef {Object}
 * @name LibraryData
 * @property {number} id
 * @property {string} locale
 */

/**
 * @typedef {Object}
 * @name LibraryState
 * @property {Array<LibraryData>} tabs
 * @property {Array<Object>} files
 */

/**
 * @type {LibraryState}
 */

export const initialState = {
    ...StaticData,
    files: [ [], [], [], [], [] ],
    emptyLocale: "Library_EmptyFiles"
};

const addFileInfo = (state, action, index) => {
    const files = state.files.slice(0);
    files[index] = [...files[index], action.payload];
    return {
        ...state,
        files
    }
};

const removeFileInfo = (state, action, index) => {
    const files = state.files.slice(0);
    files[index] = files[index].filter( file => file.id !== action.payload);
    return {
        ...state,
        files
    }
};

/**
 * @type {Object.<string, function(LibraryState, ActionData): LibraryState>}
 */

const actionHandlers = {
    [STATE.ADD_ELEMENT]: (state, action) => addFileInfo(state, action, 0),
    [STATE.ADD_FONT]: (state, action) => addFileInfo(state, action, 1),
    [STATE.ADD_PARTICLE]: (state, action) => addFileInfo(state, action, 2),
    [STATE.ADD_SKELETON]: (state, action) => addFileInfo(state, action, 3),
    [STATE.ADD_TEXTURE]: (state, action) => addFileInfo(state, action, 4),
    [STATE.REMOVE_TEXTURE]: (state, action) => removeFileInfo(state, action, 4)
};

/**
 * @param {LibraryState} state
 * @param {ActionData} action
 * @return {LibraryState}
 */

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}
