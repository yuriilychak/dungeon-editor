import { hideNewFileDialog, showNewFileDialog } from '../action';
import STATE from '../state';

describe('new-file-dialog actions', () => {
    it('changeDialogVisible', () => {
        const expectedAction1 = {
            type: STATE.CHANGE_ACTIVITY,
            payload: false
        };
        const expectedAction2 = {
            type: STATE.CHANGE_ACTIVITY,
            payload: true
        };
        expect(hideNewFileDialog()).toEqual(expectedAction1);
        expect(showNewFileDialog()).toEqual(expectedAction2);
    });
});
