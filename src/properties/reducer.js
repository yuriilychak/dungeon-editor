import StaticData from "./data";
import STATE from "./state";

export const initialState = {
    ...StaticData,
    file: null
};

const actionHandlers = {
    [STATE.SELECT_LIBRARY_ELEMENT]: (state, action) => ({
        ...state,
        file: action.payload
    }),
    [STATE.DELETE_LIBRARY_ELEMENT]: (state, action) => {
        const {id, sectionId} = action.payload;

        if (!checkSelectedElement(state, id, sectionId)) {
            return state;
        }

        return {
            ...state,
            file: null
        }
    },
    [STATE.RENAME_LIBRARY_ELEMENT]: (state, action) => {
        const {id, sectionId, name} = action.payload;

        if (!checkSelectedElement(state, id, sectionId)) {
            return state;
        }

        return {
            ...state,
            file: {
                ...state.file,
                name
            }
        }
    }
};

function checkSelectedElement(state, id, sectionId) {
    const {file} = state;
    return file !== null && file.id === id && file.sectionId === sectionId;
}

export default function topMenuReducer(state = initialState, action) {
    const actionHandler = actionHandlers[action.type];
    return actionHandler ? actionHandler(state, action) : state;
}
