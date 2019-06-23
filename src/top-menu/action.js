import TOP_MENU from "./state";
import MENU_STATE from "./enum/menu-state";

export const openTab = id => ({
    type: TOP_MENU.CHANGE,
    payload: id
});

export const selectToggle = id => ({
    type: TOP_MENU.SECTION_TOGGLE,
    payload: id
});

export const closeTab = () => ({
    type: TOP_MENU.CHANGE,
    payload: MENU_STATE.NONE
});