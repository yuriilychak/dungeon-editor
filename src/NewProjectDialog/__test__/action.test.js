import { changeDialogVisible } from '../action';
import types from '../state';

describe('NewProjectDialog actions', () => {
    it('changeDialogVisible', () => {
        const expectedAction1 = {
            type: types.CHANGE_ACTIVITY,
            payload: false
        };
        const expectedAction2 = {
            type: types.CHANGE_ACTIVITY,
            payload: true
        };
        expect(changeDialogVisible(false)).toEqual(expectedAction1);
        expect(changeDialogVisible(true)).toEqual(expectedAction2);
    })
});
