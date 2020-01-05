import TOP_MENU from "./state";
import SUBSECTIONS from "./enum/subsection";

import StaticData from "./data/index.json";
import MENU_STATE from "./enum/menu-state";
import { handleAction } from "../helpers";

export const initialState = {
    staticData: StaticData,
    openMenu: MENU_STATE.NONE,
    toggledSections: [
        SUBSECTIONS.ANCHOR,
        SUBSECTIONS.GUIDES,
        SUBSECTIONS.RULER,
        SUBSECTIONS.CHANGE_SIZE
    ]
};

const { tabs } = StaticData;
const toggleIds = [];

tabs.forEach( tab =>
    tab.sections.forEach(
        section => {
            if (section.isToggle) {
                toggleIds.push(section.id);
            }
        }
    )
);

const actionHandlers = {
    [TOP_MENU.CHANGE]: (state, openMenu) => ({ ...state, openMenu }),
    [TOP_MENU.SECTION_TOGGLE]: (state, sectionId) => {
        if (!toggleIds.includes(sectionId)) {
            return state;
        }

        const toggledSections = [...state.toggledSections];

        let index;

        if (sectionId === SUBSECTIONS.CHANGE_SIZE || sectionId === SUBSECTIONS.CHANGE_SCALE) {

            if (toggledSections.includes(sectionId)) {
                return state;
            }

            const removeId = sectionId === SUBSECTIONS.CHANGE_SIZE ?
                SUBSECTIONS.CHANGE_SCALE : SUBSECTIONS.CHANGE_SIZE;
            index = toggledSections.indexOf(removeId);

            if (index !== -1) {
                toggledSections.splice(index, 1);
            }

            toggledSections.push(sectionId);
        }
        else {
            index = toggledSections.indexOf(sectionId);

            if (index === -1) {
                toggledSections.push(sectionId);
            }
            else {
                toggledSections.splice(index, 1);
            }
        }

        return {
            ...state,
            toggledSections
        };
    }
};

export default function(state = initialState, action) {
    return handleAction(state, actionHandlers, action);
}
