import STATE from "./state";
import StaticData from "./data/index.json";
import {WorkingStage} from "../working-stage";
import {EDIT_MODE} from "../enum";

export const initialState = {
    ...StaticData,
    tabs: [],
    selectedTab: 0,
    zoomValue: 1,
    mode: EDIT_MODE.SIZE
};

const closeTab = (state, tabIndex) => {
    let {tabs, selectedTab} = state;

    if (tabIndex >= tabs.length) {
        return state;
    }

    if (selectedTab >= tabIndex && selectedTab !== 0) {
        --selectedTab;
    }

    const nextTabs = tabs.filter((tab, index) => index !== tabIndex);

    if (nextTabs.length) {
        const nextTab = nextTabs[selectedTab];

        WorkingStage.showElement(nextTab.sectionId, nextTab.fileId);
    }

    return {
        ...state,
        tabs: nextTabs,
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
    [STATE.CHANGE_MODE]: (state) => {
        let mode;

        switch (state.mode) {
            case EDIT_MODE.SIZE: {
                mode = EDIT_MODE.SKEW;
                break;
            }
            case EDIT_MODE.SKEW: {
                mode = EDIT_MODE.SCALE;
                break;
            }
            case EDIT_MODE.SCALE: {
                mode = EDIT_MODE.SIZE;
                break;
            }
        }

        return {
            ...state,
            mode
        };
    },
    [STATE.CHECK_DELETE]: (state, fileData) => {
        const { tabs } = state;
        const { fileIds, sectionId } = fileData;
        const fileInfo = fileIds.map(fileId => ({ fileId, sectionId }));

        const isNeedCloseTabs = fileInfo.some(element => isTabExist(tabs, element));

        if (!isNeedCloseTabs) {
            return state;
        }

        let nextState = state;

        fileInfo.forEach(element => {
            const tabIndex = getTabIndex(nextState.tabs, element);

            if (tabIndex === -1) {
                return;
            }

            nextState = closeTab(nextState, tabIndex);
        });

        return nextState;
    }
};

export default function workingAreaReducer(state = initialState, {type, payload}) {
    const actionHandler = actionHandlers[type];
    return actionHandler ? actionHandler(state, payload) : state;
}
