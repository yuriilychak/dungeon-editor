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
    files: [ [], [], [], [] ],
    emptyLocale: "Library_EmptyFiles"
};

/**
 * @type {Object.<string, function(LibraryState, ActionData): LibraryState>}
 */

const actionHandlers = {
    [STATE.ADD_FILES]: (state, action) => ({
        ...state
    }),
    [STATE.REMOVE_FILE]: (state, action) => ({
        ...state
    })

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
