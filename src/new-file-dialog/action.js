import STATE from "./state";

export const showNewFileDialog = sectionId => ({
    type: STATE.OPEN_POPUP,
    payload: sectionId
});
export const hideNewFileDialog = () => ({
    type: STATE.CLOSE_POPUP,
});
