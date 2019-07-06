import STATE from "./state";
import MENU_STATE from "./enum/menu-state";

export const openTab = id => ({
    type: STATE.CHANGE,
    payload: id
});

export const selectToggle = id => ({
    type: STATE.SECTION_TOGGLE,
    payload: id
});

export const closeTab = () => ({
    type: STATE.CHANGE,
    payload: MENU_STATE.NONE
});
