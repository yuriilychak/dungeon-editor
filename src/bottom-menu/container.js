import {connectStore} from "../helpers";
import {BottomMenu} from "./component";
import { changeTab } from "./action";
import {UI_SECTION} from "../enum";

export default connectStore(
    BottomMenu,
    UI_SECTION.BOTTOM_MENU,
    dispatch => ({
        onChangeTab(event, tabId) {
            dispatch(changeTab(tabId));
        }
    })
);
