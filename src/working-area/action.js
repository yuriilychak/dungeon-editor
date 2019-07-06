import STATE from "./state";

export const selectTab = index => tabAction(STATE.TAB_SELECT, index);
export const closeTab = index => tabAction(STATE.TAB_CLOSE, index);

const tabAction = (type, payload) => ({ type, payload });
