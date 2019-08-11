import STATE from "./state";
import StaticData from "./data/index.json";

export const initialState = {
    sectionId: -1,
    staticData: StaticData,
    isPopupOpen: false
};

const actionHandlers = {
    [STATE.OPEN_POPUP]: (state, action) => ({
        ...state,
        sectionId: action.payload,
        isPopupOpen: true
    }),
    [STATE.CLOSE_POPUP]: state => ({
        ...state,
        sectionId: -1,
        isPopupOpen: false
    })
};

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}

