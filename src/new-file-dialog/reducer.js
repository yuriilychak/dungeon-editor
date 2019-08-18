import STATE from "./state";
import StaticData from "./data/index.json";

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
    [STATE.OPEN_POPUP]: (state, action) => {
        const { payload: sectionId } = action;
        const { sections } = state.staticData;
        const section = sections.find(element => element.id === sectionId);

        return generateResultState(state, true, sectionId, section.types[0].id);
    },
    [STATE.CLOSE_POPUP]: state => generateResultState(state),
    [STATE.CHANGE_TYPE]: (state, { payload }) => ({ ...state, elementType: payload })
};

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}

