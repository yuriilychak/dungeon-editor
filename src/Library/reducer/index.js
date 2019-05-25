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
    files: [ [], [], [], [], [] ]
};

/**
 * @type {Object.<string, function(LibraryState, ActionData): LibraryState>}
 */

const actionHandlers = {
    [STATE.ADD_FILE]: (state, action) => {
        const files = state.files.slice(0);
        const index = action.payload.sectionId;
        files[index] = [...files[index], action.payload.data];
        return {
            ...state,
            files
        }
    },
    [STATE.REMOVE_FILE]: (state, action) => {
        const files = state.files.slice(0);
        const index = action.payload.sectionId;
        files[index] = files[index].filter( file => file.id !== action.payload.id);
        return {
            ...state,
            files
        }
    },
    [STATE.CLEAR]: (state) => ({...state, files: [ [], [], [], [], [] ]})
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
