import { default as reducer, initialState } from '../reducer';
import types from '../state';

describe('new-project-dialog reducer', () => {
    it('handle empty state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handle CHANGE_ACTIVITY', () => {
        const checkActivity = activity => {
            expect(
                reducer(undefined, {
                    type: types.CHANGE_ACTIVITY,
                    payload: activity
                })
            ).toEqual({
                ...initialState,
                isPopupOpen: activity
            });
        };

        checkActivity(true);
        checkActivity(false);

    });

    it('handle PROGRESS', () => {
        const checkProgress = progressData => {
            expect(
                reducer(undefined, {
                    type: types.PROGRESS,
                    payload: progressData
                })
            ).toEqual({
                ...initialState,
                progressData: progressData
            });
        };

        checkProgress(null);
        checkProgress({progress: 50, fileName: "text.json", isComplete: false});
    });
});
