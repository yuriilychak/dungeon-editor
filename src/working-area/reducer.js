import STATE from "./state";
import StaticData from "./data/index.json";

export const initialState = {
    ...StaticData,
    tabs: [],
    selectedTab: 0,
    zoomValue: 1
};

const closeTab = (state, tabIndex) => {
    let {tabs, selectedTab} = state;

    if (tabIndex >= tabs.length) {
        return state;
    }

    if (selectedTab >= tabIndex && selectedTab !== 0) {
        --selectedTab;
    }

    return {
        ...state,
        tabs: tabs.filter((tab, index) => index !== tabIndex),
        selectedTab
    };
};

const selectTab = (state, tabIndex) => {
    if (tabIndex === state.selectedTab) {
        return state;
    }

    return {
        ...state,
        selectedTab: tabIndex
    };
};
const compareTabData = (tab1, tab2) => tab1.sectionId === tab2.sectionId && tab1.fileId === tab2.fileId;
const getTabIndex = (tabs, fileData) => tabs.findIndex(tab => compareTabData(fileData, tab));
const isTabExist = (tabs, fileData) => tabs.length !== 0 && tabs.findIndex(tab => compareTabData(fileData, tab)) !== -1;

const actionHandlers = {
    [STATE.TAB_ADD]: (state, fileData) => {
        let {tabs} = state;

        if (isTabExist(tabs, fileData)) {
            const tabIndex = getTabIndex(tabs, fileData);
            return selectTab(state, tabIndex);
        }

        return {
            ...state,
            tabs: [...tabs, fileData],
            selectedTab: tabs.length
        }
    },
    [STATE.TAB_SELECT]: selectTab,
    [STATE.TAB_CLOSE]: closeTab,
    [STATE.ZOOM_CHANGE]: (state, zoomValue) => ({...state, zoomValue}),
    [STATE.TRANSFORM_RESET]: state => ({...state, zoomValue: 1}),
    [STATE.CHECK_RENAME]: (state, fileData) => {
        const {tabs} = state;

        if (!isTabExist(tabs, fileData)) {
            return state;
        }

        return {
            ...state,
            tabs: tabs.map(tab => !compareTabData(tab, fileData) ?
                tab : {
                    ...tab,
                    title: fileData.title
                }
            )
        }
    },
    [STATE.CHECK_DELETE]: (state, fileData) => {
        const {tabs} = state;

        if (!isTabExist(tabs, fileData)) {
            return state;
        }

        const tabIndex = getTabIndex(tabs, fileData);

        return closeTab(state, tabIndex);
    }
};

export default function workingAreaReducer(state = initialState, {type, payload}) {
    const actionHandler = actionHandlers[type];
    return actionHandler ? actionHandler(state, payload) : state;
}
