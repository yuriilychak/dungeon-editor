import {default as reducer, initialState} from '../reducer';
import types from '../state';

describe('new-project-dialog reducer', () => {
    it('handle empty state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handle OPEN_POPUP', () => {
        expect(
            reducer(undefined, {
                type: types.OPEN_POPUP,
                payload: 1
            })
        ).toEqual({
            ...initialState,
            isPopupOpen: true,
            sectionId: 1
        });
    });

    it('handle CLOSE_POPUP', () => {
        expect(
            reducer(undefined, {
                type: types.CLOSE_POPUP,
                payload: false
            })
        ).toEqual({
            ...initialState,
            isPopupOpen: false
        });
    });
});
