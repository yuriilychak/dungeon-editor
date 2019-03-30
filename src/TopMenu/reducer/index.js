import TOP_MENU from "../state";
import SUBSECTIONS from "../enum/Subsection";

import StaticData from "../../data/TopMenuData.json";
import MENU_STATE from "../enum/MenuState";

const initialState = {
    staticData: StaticData,
    openMenu: MENU_STATE.NONE,
    toggledSections: [SUBSECTIONS.CHANGE_SIZE]
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

export default function topMenuReducer(state = initialState, action) {
    switch (action.type) {
        case TOP_MENU.CHANGE: {
            return {
                ...state,
                openMenu: action.payload
            }
        }
        case TOP_MENU.SECTION_TOGGLE: {
            const sectionId = action.payload;

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
        default: {
            return state;
        }
    }
}
