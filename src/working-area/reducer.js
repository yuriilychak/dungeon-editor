import STATE from "./state";
import StaticData from "./data/index.json";

export const initialState = {
    ...StaticData,
    tabs: [],
    selectedTab: 0,
    zoomValue: 1
};

const actionHandlers = {
    [STATE.TAB_ADD]: (state, action) => {
        const { payload } = action;
        let { tabs } = state;

        if (tabs.findIndex(tab => (
            tab.sectionId === payload.sectionId &&
                tab.fileId === payload.fileId
        )) !== -1) {
            return state;
        }

        return {
            ...state,
            tabs: [...tabs, payload],
            selectedTab: tabs.length
        }
    },
    [STATE.TAB_SELECT]: (state, action) => {
        const { payload } = action;

        if (payload === state.selectedTab) {
            return state;
        }

        return {
            ...state,
            selectedTab: payload
        };
    },
    [STATE.TAB_CLOSE]: (state, action) => {
        const { payload } = action;
        let { tabs, selectedTab } = state;

        if (payload >= tabs.length) {
            return state;
        }

        if (selectedTab >= payload && selectedTab !== 0) {
            --selectedTab;
        }

        return {
            ...state,
            tabs: tabs.filter((tab, index) => index !== payload),
            selectedTab
        };
    },
    [STATE.ZOOM_CHANGE]: (state, action) => ({
        ...state,
        zoomValue: action.payload
    }),
    [STATE.TRANSFORM_RESET]: state => ({
        ...state,
        zoomValue: 1
    })
};

export default function workingAreaReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}
