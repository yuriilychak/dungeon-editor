import STATE from "./state";

export const showNewFileDialog = sectionId => ({
    type: STATE.OPEN_POPUP,
    payload: sectionId
});
export const hideNewFileDialog = () => ({
    type: STATE.CLOSE_POPUP,
    payload: null
});

export const changeElementType = typeId => ({
    type: STATE.CHANGE_TYPE,
    payload: typeId
});
