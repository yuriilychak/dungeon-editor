import reducer from '../reducer';
import types from '../state';
import MENU_STATE from "../enum/menu-state";
import SUBSECTIONS from "../enum/subsection";
import { reducerTemplate } from "../../../test_templates";
import { UI_SECTION } from "../../enum";

describe("top-menu reducer", () => {
    const { initialState, checkHandler } = reducerTemplate(reducer, UI_SECTION.TOP_MENU);

    checkHandler(types.CHANGE, MENU_STATE.VIEW, { openMenu: MENU_STATE.VIEW });

    const checkToggle = (section, outputToggles, inToggles = initialState.toggledSections) =>
        checkHandler(
            types.SECTION_TOGGLE,
            section,
            { toggledSections: outputToggles },
            { toggledSections: inToggles }
        );

    checkToggle(
        SUBSECTIONS.ANCHOR,
        [
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SIZE
        ]
    );

    checkToggle(
        SUBSECTIONS.CHANGE_SCALE,
        [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SCALE
        ]
    );

    checkToggle(
        SUBSECTIONS.CHANGE_SIZE, [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SIZE
        ]
    );

    checkToggle(
        SUBSECTIONS.LOCK_GUIDES,
        [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SIZE,
            SUBSECTIONS.LOCK_GUIDES
        ]
    );

    checkToggle(
        SUBSECTIONS.NEW_PROJECT,
        [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SIZE
        ]
    );

    checkToggle(
        SUBSECTIONS.CHANGE_SIZE,
        [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SIZE
        ],
        [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SCALE
        ]
    );

    checkToggle(
        SUBSECTIONS.CHANGE_SCALE,
        [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER,
            SUBSECTIONS.CHANGE_SCALE
        ],
        [
            SUBSECTIONS.ANCHOR,
            SUBSECTIONS.GUIDES,
            SUBSECTIONS.RULER
        ]
    );
});
