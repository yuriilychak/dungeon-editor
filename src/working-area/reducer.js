import STATE from "./state";
import StaticData from "./data/index.json";

export const initialState = {
    ...StaticData,
    tabs: [
        {
            title: "skeleton",
            fileId: 35,
            sectionId: 3
        },
        {
            title: "particle",
            fileId: 35,
            sectionId: 2
        },
        {
            title: "font",
            fileId: 35,
            sectionId: 1
        }
    ],
    selectedTab: 0
};

const actionHandlers = {
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
    }
};

export default function workingAreaReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}
