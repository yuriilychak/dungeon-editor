import TOP_MENU from "../state";

import StaticData from "../../data/TopMenuData.json";
import MENU_STATE from "../enum/MenuState";

const initialState = {
    staticData: StaticData,
    openMenu: MENU_STATE.NONE
};

export default function topMenuReducer(state = initialState, action) {
    switch (action.type) {
        case TOP_MENU.CHANGE: {
            return {
                ...state,
                openMenu: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
