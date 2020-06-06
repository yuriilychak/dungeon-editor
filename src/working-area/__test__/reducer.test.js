import reducer from "../reducer";
import { reducerTemplate } from "../../../test_templates";
import STATE from "../state";
import { UI_SECTION } from "../../enum";

jest.mock("../../working-stage");

describe("working-area reducer", () => {
    const { initialState, checkHandler } = reducerTemplate(reducer, UI_SECTION.WORKING_AREA);

    const createState = (tabCount, selectedTab, startIndex = 1) => {
        const tabs = [];
        const lastIndex = tabCount + startIndex - 1;

        for (let i = startIndex; i <= lastIndex; ++i) {
            tabs.push({
                title: `test_${i}`,
                sectionId: i,
                fileId: i
            });
        }
        return {
            ...initialState,
            tabs,
            selectedTab
        };
    };

    const testTab = { title: "test_1", fileId: 1, sectionId: 1 };

    const oneItemState = createState(1, 0);
    const twoItemState = createState(2, 1);
    const threeItemState = createState(3, 0);

    checkHandler(STATE.TAB_ADD, testTab, oneItemState);
    checkHandler(STATE.TAB_ADD, testTab, oneItemState, oneItemState, "when add existing tab");
    checkHandler(STATE.TAB_SELECT, 0, createState(2, 0), twoItemState);
    checkHandler(STATE.TAB_SELECT, 1, twoItemState, twoItemState, "when select selected tab");
    checkHandler(STATE.TAB_CLOSE, 1, oneItemState, twoItemState);
    checkHandler(
        STATE.TAB_CLOSE,
        0,
        createState(1, 0, 2),
        createState(2, 0),
        "when close first tab"
    );
    checkHandler(
        STATE.TAB_CLOSE,
        3,
        threeItemState,
        threeItemState,
        "when close not exist tab"
    );
});
