import { closeTab, selectTab } from '../action';
import STATE from '../state';


describe("working-area actions", () => {
    it("closeTab action", () => {
        expect(selectTab(0)).toEqual({
            type: STATE.TAB_SELECT,
            payload: 0
        });
    });

    it("selectTab action", () => {
        expect(closeTab(0)).toEqual({
            type: STATE.TAB_CLOSE,
            payload: 0
        });
    });
});
