import { hideNewProjectDialog, showNewProjectDialog } from '../action';
import STATE from '../state';

describe('new-project-dialog actions', () => {
    it('changeDialogVisible', () => {
        const expectedAction1 = {
            type: STATE.CHANGE_ACTIVITY,
            payload: false
        };
        const expectedAction2 = {
            type: STATE.CHANGE_ACTIVITY,
            payload: true
        };
        expect(hideNewProjectDialog()).toEqual(expectedAction1);
        expect(showNewProjectDialog()).toEqual(expectedAction2);
    });
});
