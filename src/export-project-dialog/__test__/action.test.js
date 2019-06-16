import { hideExportProjectDialog, showExportProjectDialog, changeProgress } from '../action';
import types from '../state';

describe('new-project-dialog actions', () => {
    it('hideExportProjectDialog', () => {
        const expectedAction = {
            type: types.CHANGE_ACTIVITY,
            payload: false
        };
        expect(hideExportProjectDialog()).toEqual(expectedAction);
    });

    it('showExportProjectDialog', () => {
        const expectedAction = {
            type: types.CHANGE_ACTIVITY,
            payload: true
        };
        expect(showExportProjectDialog()).toEqual(expectedAction);
    });

    it('changeProgress with full data', () => {
        const expectedAction = {
            type: types.PROGRESS,
            payload: {
                progress: 50,
                fileName: "text.json",
                isComplete: false
            }
        };
        expect(changeProgress(50, "text.json", false)).toEqual(expectedAction);
    });

    it('changeProgress with percent only', () => {
        const expectedAction = {
            type: types.PROGRESS,
            payload: {
                progress: 50,
                fileName: null,
                isComplete: false
            }
        };
        expect(changeProgress(50)).toEqual(expectedAction);
    });
});
