import STATE from "./state";
import MENU_STATE from "./enum/menu-state";
import {handleAction} from "../helpers";

export const openTab = id => handleAction(STATE.CHANGE, id);
export const selectToggle = id => handleAction(STATE.SECTION_TOGGLE, id);
export const closeTab = () => handleAction(STATE.CHANGE, MENU_STATE.NONE);
