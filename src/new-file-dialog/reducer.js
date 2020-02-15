import STATE from "./state";
import {generateReducerData} from "../helpers";

const generateResultState = (
    state,
    isPopupOpen = false,
    sectionId = -1,
    elementType = -1
) => ({
    ...state,
    sectionId,
    elementType,
    isPopupOpen
});

export default generateReducerData(
    {
        sectionId: -1,
        elementType: -1,
        isPopupOpen: false
    },
    {
        [STATE.OPEN_POPUP]: (state, sectionId) => {
            const { sections } = state;
            const section = sections.find(element => element.id === sectionId);

            return generateResultState(state, true, sectionId, section.types[0].id);
        },
        [STATE.CLOSE_POPUP]: state => generateResultState(state),
        [STATE.CHANGE_TYPE]: (state, elementType) => ({ ...state, elementType })
    }
);

