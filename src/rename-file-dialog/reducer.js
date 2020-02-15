import STATE from "./state";
import {generateReducerData} from "../helpers";

export default generateReducerData(
    {
        isPopupOpen: false
    },
    {
        [STATE.CHANGE_ACTIVITY]: (state, isPopupOpen) => ({ ...state, isPopupOpen })
    }
);

