import { default as reducer, initialState } from '../reducer';
import types from '../state';

describe('rename-file-dialog reducer', () => {
    it('handle empty state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handle CHANGE_ACTIVITY', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_ACTIVITY,
                payload: true
            })
        ).toEqual({
            ...initialState,
            isPopupOpen: true
        });
        expect(
            reducer(undefined, {
                type: types.CHANGE_ACTIVITY,
                payload: false
            })
        ).toEqual({
            ...initialState,
            isPopupOpen: false
        });
    });
});
