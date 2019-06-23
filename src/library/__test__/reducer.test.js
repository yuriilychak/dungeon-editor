import { default as reducer, initialState } from '../reducer';
import types from '../state';

describe('new-project-dialog reducer', () => {
    it('handle empty state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
});
