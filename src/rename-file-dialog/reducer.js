import STATE from "./state";
import StaticData from "./data/index.json";
import { handleAction } from "../helpers";

export const initialState = {
    staticData: StaticData,
    isPopupOpen: false
};

const actionHandlers = {
    [STATE.CHANGE_ACTIVITY]: (state, isPopupOpen) => ({ ...state, isPopupOpen })
};

export default function topMenuReducer(state = initialState, action) {
    return handleAction(state, actionHandlers, action);
}

