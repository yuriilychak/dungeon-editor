import { hideRenameFileDialog, showRenameFileDialog } from '../action';
import types from '../state';

describe('rename-file-dialog actions', () => {
    it('changeDialogVisible', () => {
        const expectedAction1 = {
            type: types.CHANGE_ACTIVITY,
            payload: false
        };
        const expectedAction2 = {
            type: types.CHANGE_ACTIVITY,
            payload: true
        };
        expect(hideRenameFileDialog()).toEqual(expectedAction1);
        expect(showRenameFileDialog()).toEqual(expectedAction2);
    })
});
