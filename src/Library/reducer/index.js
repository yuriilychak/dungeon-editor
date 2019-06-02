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
    files: [[], [], [], [], []]
};

/**
 * @type {Object.<string, function(LibraryState, ActionData): LibraryState>}
 */

const actionHandlers = {
    [STATE.ADD_DIRECTORY]: (state, action) => addElementToTree(action, true, state),
    [STATE.ADD_FILE]: (state, action) => addElementToTree(action, false, state),
    [STATE.REMOVE_FILE]: (state, action) => {
        const files = state.files.slice(0);
        const index = action.payload.sectionId;
        files[index] = files[index].filter(file => file.id !== action.payload.id);
        return {
            ...state,
            files
        }
    },
    [STATE.UPDATE_TREE]: (state, action) => {
        const files = state.files.slice(0);
        const {fileTree, sectionId} = action.payload;
        files[sectionId] = fileTree;
        return {...state, files};
    },
    [STATE.CLEAR]: state => ({...state, files: [[], [], [], [], []]})
};

function addElementToTree(action, isDirectory, state) {
    const files = state.files.slice(0);
    const {sectionId, data} = action.payload;
    const file = {
        title: data.name,
        id: data.id,
        parentId: data.parentId,
        hasPreview: false,
        isDirectory: isDirectory
    };
    const parentId = file.parentId;
    const fileTree = files[sectionId].slice(0);

    if (parentId === -1) {
        fileTree.push(file);
    }
    else {
        const parent = findDir(fileTree, parentId);

        if (!parent) {
            return state;
        }

        if (!parent.children) {
            parent.children = [];
        }

        parent.children.push(file);
    }

    files[sectionId] = fileTree;

    return {
        ...state,
        files
    };
}

function findDir(data, id) {
    const dirs = data.filter(element => element.isDirectory);
    let result = dirs.find( dir => dir.id === id);

    if (result) {
        return result;
    }

    dirs.forEach( dir => {
        if (!dir.children || result) {
            return;
        }

        result = findDir(dir.children, id);
    });

    return result;
}

/**
 * @param {LibraryState} state
 * @param {ActionData} action
 * @return {LibraryState}
 */

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}
