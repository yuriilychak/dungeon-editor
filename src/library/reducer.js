import STATE from "./state";
import {generateReducerData} from "../helpers";

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

function refreshParentIds(files, parentId = -1) {
    files.forEach(file => {
        file.parentId = parentId;
        if (file.isDirectory && file.children && file.children.length !== 0) {
            refreshParentIds(file.children, file.id);
        }
    })
}

function addElementToTree(payload, isDirectory, state) {
    const files = state.files.slice(0);
    const {sectionId, data} = payload;
    const file = {
        title: data.name,
        id: data.id,
        parentId: data.parentId,
        preview: data.preview,
        isDirectory: isDirectory
    };
    const parentId = file.parentId;
    const fileTree = files[sectionId].slice(0);

    if (parentId === -1) {
        fileTree.push(file);
    }
    else {
        const parent = findElement(fileTree, parentId);

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

function findElement(data, id) {
    const dirs = data.filter(element => element.isDirectory);
    let result = data.find(element => element.id === id);

    if (result) {
        return result;
    }

    dirs.forEach( dir => {
        if (!dir.children || result) {
            return;
        }

        result = findElement(dir.children, id);
    });

    return result;
}

/**
 * @param {LibraryState} state
 * @param {ActionData} action
 * @return {LibraryState}
 */

export default generateReducerData(
    {
        files: [[], [], [], [], [], [], []]
    },
    {
        [STATE.ADD_DIRECTORY]: (state, payload) => addElementToTree(payload, true, state),
        [STATE.ADD_FILE]: (state, payload) => addElementToTree(payload, false, state),
        [STATE.REMOVE_FILE]: (state, payload) => {
            const files = state.files.slice(0);
            const { sectionId, id } = payload;
            const fileTree = files[sectionId];
            const element = findElement(fileTree, id);
            const parentId = element.parentId;

            if (parentId === -1) {
                files[sectionId] = fileTree.filter(element => element.id !== id);
            }
            else {
                const parent = findElement(fileTree, parentId);
                parent.children = parent.children.filter(element => element.id !== id);

                files[sectionId] = fileTree.slice(0);
            }

            return {
                ...state,
                files
            }
        },
        [STATE.UPDATE_TREE]: (state, payload) => {
            const files = state.files.slice(0);
            const {fileTree, sectionId} = payload;
            refreshParentIds(fileTree);

            files[sectionId] = fileTree;

            return {...state, files};
        },
        [STATE.RENAME_FILE]: (state, payload) => {
            const files = state.files.slice(0);
            const {id, sectionId, name} = payload;
            const fileTree = files[sectionId];

            const element = findElement(fileTree, id);

            if (!element) {
                return state;
            }

            element.title = name;

            files[sectionId] = fileTree.slice(0);

            return {...state, files};
        },
        [STATE.CLEAR]: state => ({...state, files: [[], [], [], [], [], [], []]})
    }
    );
