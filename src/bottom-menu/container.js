import {connectStore} from "../helpers";
import {BottomMenu} from "./component";
import { changeTab } from "./action";

export default connectStore(
    BottomMenu,
    'bottomMenu',
    dispatch => ({
        onChangeTab(event, tabId) {
            dispatch(changeTab(tabId));
        }
    })
);
