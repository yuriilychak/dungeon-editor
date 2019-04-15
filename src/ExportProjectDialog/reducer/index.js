import STATE from "../state";

export const initialState = {
    isPopupOpen: false
};

const actionHandlers = {
    [STATE.CHANGE_ACTIVITY]: (state, action) => {
        return {
            isPopupOpen: action.payload
        }
    }
};

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}
