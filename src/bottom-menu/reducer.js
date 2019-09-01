import StaticData from "./data";
import STATE from "./state";
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

export default function topMenuReducer(state = initialState, { type, payload}) {
    const actionHandler = actionHandlers[type];
    return actionHandler ? actionHandler(state, payload) : state;
}

