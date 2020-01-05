import StaticData from "./data";
import STATE from "./state";
import { handleAction } from "../helpers";

export const initialState = {
    ...StaticData,
    sectionId: -1,
    fileId: -1,
    tabIndex: 0,
    elements: []
};

const actionHandlers = {
    [STATE.OPEN_ELEMENT]: (state, { fileId, sectionId }) => {
        return {
            ...state,
            fileId,
            sectionId,
            tabIndex: 0
        }
    },
    [STATE.CHANGE_TAB]: (state, tabIndex) => ({ ...state, tabIndex })
};

export default function topMenuReducer(state = initialState, action) {
    return handleAction(state, actionHandlers, action);
}

