import { openTab, selectToggle, closeTab } from '../action';
import types from '../state';
import MENU_STATE from "../enum/MenuState";
import SUBSECTION from "../enum/Subsection";

describe('TopMenu actions', () => {
    it('openTab', () => {
        const expectedAction = {
            type: types.CHANGE,
            payload: MENU_STATE.VIEW
        };
        expect(openTab(MENU_STATE.VIEW)).toEqual(expectedAction);
    });

    it('selectToggle', () => {
        const expectedAction = {
            type: types.SECTION_TOGGLE,
            payload: SUBSECTION.ABOUT
        };
        expect(selectToggle(SUBSECTION.ABOUT)).toEqual(expectedAction);
    });

    it('closeTab', () => {
        const expectedAction = {
            type: types.CHANGE,
            payload: MENU_STATE.NONE
        };
        expect(closeTab()).toEqual(expectedAction);
    });
});