import NEW_PROJECT_DIALOG from "./state";
import StaticData from "./data/index.json";

export const initialState = {
    staticData: StaticData,
    isPopupOpen: false
};

const actionHandlers = {
    [NEW_PROJECT_DIALOG.CHANGE_ACTIVITY]: (state, action) => {
        return {
            ...state,
            isPopupOpen: action.payload
        }
    }
};

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}

