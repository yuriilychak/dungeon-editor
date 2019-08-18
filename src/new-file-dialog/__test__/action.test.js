import { hideNewFileDialog, showNewFileDialog } from '../action';
import STATE from '../state';

describe('new-file-dialog actions', () => {
    it('showNewFileDialog', () => {
        expect(showNewFileDialog(3)).toEqual({
            type: STATE.OPEN_POPUP,
            payload: 3
        });
    });

    it('hideNewFileDialog', () => {
        expect(hideNewFileDialog()).toEqual({
            type: STATE.CLOSE_POPUP,
            payload: null
        });
    });
});
