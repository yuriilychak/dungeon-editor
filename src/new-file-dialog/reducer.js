import STATE from "./state";
import StaticData from "./data/index.json";
import { handleAction } from "../helpers";

export const initialState = {
    sectionId: -1,
    elementType: -1,
    staticData: StaticData,
    isPopupOpen: false
};

const generateResultState = (
    state,
    isPopupOpen = false,
    sectionId = -1,
    elementType = -1
) => ({
    ...state,
    sectionId,
    elementType,
    isPopupOpen
});

const actionHandlers = {
    [STATE.OPEN_POPUP]: (state, sectionId) => {
        const { sections } = state.staticData;
        const section = sections.find(element => element.id === sectionId);

        return generateResultState(state, true, sectionId, section.types[0].id);
    },
    [STATE.CLOSE_POPUP]: state => generateResultState(state),
    [STATE.CHANGE_TYPE]: (state, elementType) => ({ ...state, elementType })
};

export default function topMenuReducer(state = initialState, action) {
    return handleAction(state, actionHandlers, action);
}

