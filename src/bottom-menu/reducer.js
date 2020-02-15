import STATE from "./state";
import {generateReducerData} from "../helpers";

export default generateReducerData(
    {
            sectionId: -1,
            fileId: -1,
            tabIndex: 0,
            elements: []
        },
    {
            [STATE.OPEN_ELEMENT]: (state, { fileId, sectionId }) => {
                return {
                    ...state,
                    fileId,
                    sectionId,
                    tabIndex: 0
                }
            },
            [STATE.CHANGE_TAB]: (state, tabIndex) => ({ ...state, tabIndex })
        }
);

