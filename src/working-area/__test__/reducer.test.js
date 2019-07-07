import {default as reducer, initialState} from '../reducer';
import { closeTab, selectTab, addTab } from "../action";

describe('working-area reducer', () => {
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
        }
    };

    const addNewTab = () => addTab("test_1", 1, 1);

    const oneItemState = createState(1, 0);
    const twoItemState = createState(2, 1);

    it('handle empty state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handle TAB_ADD', () => {
        expect(reducer(undefined, addNewTab())).toEqual(oneItemState);
    });

    it('handle TAB_ADD with existing tab', () => {
        expect(reducer(oneItemState, addNewTab())).toEqual(oneItemState);
    });

    it('handle TAB_SELECT', () => {
        expect(reducer(twoItemState, selectTab(0)))
            .toEqual(createState(2, 0));
    });

    it('handle TAB_SELECT when select selected tab', () => {
        expect(reducer(twoItemState, selectTab(1))).toEqual(twoItemState);
    });

    it('handle TAB_CLOSE', () => {
        expect(reducer(twoItemState, closeTab(1))).toEqual(oneItemState);
    });

    it('handle TAB_CLOSE when close first tab', () => {
        expect(reducer(createState(2, 0), closeTab(0))).toEqual(createState(1, 0, 2));
    });

    it('handle TAB_CLOSE with close not existing tab', () => {
        const state = createState(3, 0);
        expect(reducer(state, closeTab(3))).toEqual(state);
    });
});
