import PROJECT_DATA from "../state";
import StaticData from "../../data/ProjectTemplate.json";

export const initialState = {
    ...StaticData
};

const actionHandlers = {
    [PROJECT_DATA.INIT_NEW_PROJECT]: (state, action) => ({
        ...StaticData,
        projectName: action.payload
    }),
};

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}
