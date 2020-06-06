import { addFile, renameFile, removeFile, updateTree, addDirectory, clearLibrary } from '../action';
import STATE from '../state';
import { handleAction } from "../../helpers";

describe('library actions', () => {
    it('clearLibrary', () => {
        const expectedAction = handleAction(STATE.CLEAR, null);
        expect(clearLibrary()).toEqual(expectedAction);
    });

    it('addDirectory', () => {
        const data = {
            sectionId: 5,
            data: 4
        };
        const expectedAction = handleAction(STATE.ADD_DIRECTORY, data);
        expect(addDirectory(data)).toEqual(expectedAction);
    });

    it('updateTree', () => {
        const expectedAction = handleAction(
            STATE.UPDATE_TREE,
            {
                fileTree: [],
                sectionId: 5
            }
        );
        expect(updateTree([], 5)).toEqual(expectedAction);
    });

    it('removeFile', () => {
        const expectedAction = handleAction(
            STATE.REMOVE_FILE,
            {
                id: 3,
                sectionId: 5
            }
        );
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
            payload: {}
        };
        expect(addFile({})).toEqual(expectedAction);
    });
});
