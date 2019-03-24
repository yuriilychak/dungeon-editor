import TOP_MENU from "../state";
import MENU_STATE from "../enum/MenuState";

export const openTab = (id) => ({
    type: TOP_MENU.CHANGE,
    payload: id
});

export const closeTab = () => ({
    type: TOP_MENU.CHANGE,
    payload: MENU_STATE.NONE
});
