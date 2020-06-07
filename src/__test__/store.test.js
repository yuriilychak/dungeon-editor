import initStore from "../store";
import { UI_SECTION } from "../enum";

jest.mock("redux", () => ({
    createStore: data => data,
    combineReducers: data => data
}));

jest.mock("../top-menu/reducer", () => ({
    definedState: {},
    handlers: {}
}));

jest.mock("../bottom-menu/reducer", () => ({
    definedState: {},
    handlers: {}
}));

jest.mock("../new-file-dialog/reducer", () => ({
    definedState: {},
    handlers: {}
}));

jest.mock("../new-project-dialog/reducer", () => ({
    definedState: {},
    handlers: {}
}));

jest.mock("../rename-file-dialog/reducer", () => ({
    definedState: {},
    handlers: {}
}));

jest.mock("../export-project-dialog/reducer", () => ({
    definedState: {},
    handlers: {}
}));

jest.mock("../library/reducer", () => ({
    definedState: {},
    handlers: {
        ["LIBRARY.CORRECT_TYPE"]: () => ({ result: "correct"})
    }
}));

jest.mock("../properties/reducer", () => ({
    definedState: {},
    handlers: {}
}));

jest.mock("../working-area/reducer", () => ({
    definedState: {},
    handlers: {}
}));

describe("GIVEN initStore", () => {
    it("WHEN call initStore THEN result object should equal init object", () => {
        const store = initStore();
        const emptyResult = {};
        const libraryReducer = store[UI_SECTION.LIBRARY];
        expect(libraryReducer()).toEqual(emptyResult);
        expect(libraryReducer({}, { type: "LIBRARY.WRONG_TYPE", payload: null })).toEqual(emptyResult);
        expect(libraryReducer({}, { type: "LIBRARY.CORRECT_TYPE", payload: null })).toEqual({ result: "correct"});
    });
});