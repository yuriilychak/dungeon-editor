import { addFile, renameFile, removeFile, updateTree, addDirectory, clearLibrary } from '../action';
import STATE from '../state';

describe('library actions', () => {
    it('clearLibrary', () => {
        const expectedAction = {
            type: STATE.CLEAR,
            payload: null
        };
        expect(clearLibrary()).toEqual(expectedAction);
    });

    it('addDirectory', () => {
        const expectedAction = {
            type: STATE.ADD_DIRECTORY,
            payload: {
                sectionId: 5,
                data: 4
            }
        };
        expect(addDirectory(5, 4)).toEqual(expectedAction);
    });

    it('updateTree', () => {
        const expectedAction = {
            type: STATE.UPDATE_TREE,
            payload: {
                fileTree: [],
                sectionId: 5
            }
        };
        expect(updateTree([], 5)).toEqual(expectedAction);
    });

    it('removeFile', () => {
        const expectedAction = {
            type: STATE.REMOVE_FILE,
            payload: {
                id: 3,
                sectionId: 5
            }
        };
        expect(removeFile(3, 5)).toEqual(expectedAction);
    });

    it('renameFile', () => {
        const expectedAction = {
            type: STATE.RENAME_FILE,
            payload: {
                id: 3,
                sectionId: 5,
                name: "text"
            }
        };
        expect(renameFile(3, 5, "text")).toEqual(expectedAction);
    });

    it('addFile', () => {
        const expectedAction = {
            type: STATE.ADD_FILE,
            payload: {
                data: {},
                sectionId: 3
            }
        };
        expect(addFile({}, 3)).toEqual(expectedAction);
    });
});
