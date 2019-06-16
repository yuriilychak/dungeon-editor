import { default as reducer, initialState } from '../reducer';
import types from '../state';
import MENU_STATE from "../enum/menu-state";
import SUBSECTIONS from "../enum/subsection";

describe('new-project-dialog reducer', () => {
    it('handle empty state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handle CHANGE', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE,
                payload: MENU_STATE.VIEW
            })
        ).toEqual({
            ...initialState,
            openMenu: MENU_STATE.VIEW
        });
    });

    it('handle SECTION_TOGGLE', () => {
        expect(
            reducer(undefined, {
                type: types.SECTION_TOGGLE,
                payload: SUBSECTIONS.ANCHOR
            })
        ).toEqual({
            ...initialState,
            toggledSections: [
                SUBSECTIONS.GUIDES,
                SUBSECTIONS.RULER,
                SUBSECTIONS.CHANGE_SIZE
            ]
        });
        expect(
            reducer(undefined, {
                type: types.SECTION_TOGGLE,
                payload: SUBSECTIONS.CHANGE_SCALE
            })
        ).toEqual({
            ...initialState,
            toggledSections: [
                SUBSECTIONS.ANCHOR,
                SUBSECTIONS.GUIDES,
                SUBSECTIONS.RULER,
                SUBSECTIONS.CHANGE_SCALE
            ]
        });
        expect(
            reducer(undefined, {
                type: types.SECTION_TOGGLE,
                payload: SUBSECTIONS.CHANGE_SIZE
            })
        ).toEqual({
            ...initialState,
            toggledSections: [
                SUBSECTIONS.ANCHOR,
                SUBSECTIONS.GUIDES,
                SUBSECTIONS.RULER,
                SUBSECTIONS.CHANGE_SIZE
            ]
        });
        expect(
            reducer(undefined, {
                type: types.SECTION_TOGGLE,
                payload: SUBSECTIONS.LOCK_GUIDES
            })
        ).toEqual({
            ...initialState,
            toggledSections: [
                SUBSECTIONS.ANCHOR,
                SUBSECTIONS.GUIDES,
                SUBSECTIONS.RULER,
                SUBSECTIONS.CHANGE_SIZE,
                SUBSECTIONS.LOCK_GUIDES
            ]
        });
        expect(
            reducer(undefined, {
                type: types.SECTION_TOGGLE,
                payload: SUBSECTIONS.NEW_PROJECT
            })
        ).toEqual({
            ...initialState,
            toggledSections: [
                SUBSECTIONS.ANCHOR,
                SUBSECTIONS.GUIDES,
                SUBSECTIONS.RULER,
                SUBSECTIONS.CHANGE_SIZE
            ]
        });
        expect(
            reducer({
                ...initialState,
                toggledSections: [
                    SUBSECTIONS.ANCHOR,
                    SUBSECTIONS.GUIDES,
                    SUBSECTIONS.RULER,
                    SUBSECTIONS.CHANGE_SCALE
                ]
            },
                {
                type: types.SECTION_TOGGLE,
                payload: SUBSECTIONS.CHANGE_SIZE
            })
        ).toEqual({
            ...initialState,
            toggledSections: [
                SUBSECTIONS.ANCHOR,
                SUBSECTIONS.GUIDES,
                SUBSECTIONS.RULER,
                SUBSECTIONS.CHANGE_SIZE
            ]
        });
        expect(
            reducer({
                    ...initialState,
                    toggledSections: [
                        SUBSECTIONS.ANCHOR,
                        SUBSECTIONS.GUIDES,
                        SUBSECTIONS.RULER
                    ]
                },
                {
                    type: types.SECTION_TOGGLE,
                    payload: SUBSECTIONS.CHANGE_SCALE
                })
        ).toEqual({
            ...initialState,
            toggledSections: [
                SUBSECTIONS.ANCHOR,
                SUBSECTIONS.GUIDES,
                SUBSECTIONS.RULER,
                SUBSECTIONS.CHANGE_SCALE
            ]
        });
    });
});
