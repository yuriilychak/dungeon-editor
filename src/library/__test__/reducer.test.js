import {default as reducer, initialState} from "../reducer";
import STATE from "../state";

const createAction = (type, payload = null) => ({type, payload});
const stateFromSection = section => ({...initialState, files: [section, [], [], [], []]});
const createTreeElement = (id, isDirectory, parentId = -1, children = undefined, customTitle = null) => ({
    id, title: customTitle || `test${id}`, parentId, children, isDirectory
});

const testState = (state, payload, inTree, outTree) => {
    expect(
        reducer(stateFromSection(inTree), createAction(state, payload))
    ).toEqual(stateFromSection(outTree));
};

describe("library reducer", () => {
    let inTree, outTree, payload, element;

    it("handle empty state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("handle clear state", () => {
        expect(reducer(initialState, createAction(STATE.CLEAR))).toEqual(initialState);
    });

    it("handle rename file", () => {
        const name = "test1";
        inTree = [createTreeElement(0, false)];
        outTree = [createTreeElement(0, false,-1, undefined, name)];
        payload = {
            id: 0,
            sectionId: 0,
            name
        };
        testState(STATE.RENAME_FILE, payload, inTree, outTree);

        inTree = [createTreeElement(0, false)];
        outTree = [createTreeElement(0, false)];
        payload = {
            id: 1,
            sectionId: 0,
            name
        };
        testState(STATE.RENAME_FILE, payload, inTree, outTree);
    });

    it("handle remove file", () => {
        inTree = [
            createTreeElement(0, false),
            createTreeElement(1, false)
        ];
        outTree = [
            createTreeElement(0, false)
        ];
        payload = { sectionId: 0, id: 1 };
        testState(STATE.REMOVE_FILE, payload, inTree, outTree);

        inTree = [
            createTreeElement(2, true,-1),
            createTreeElement(0,  true,-1, [
                createTreeElement(1, false,0)
            ])
        ];
        outTree = [
            createTreeElement(2, true,-1),
            createTreeElement(0, true,-1, [])
        ];
        payload = { sectionId: 0, id: 1 };
        testState(STATE.REMOVE_FILE, payload, inTree, outTree);
    });

    it("handle update file tree", () => {
        inTree = [
            createTreeElement(0, false),
            createTreeElement(1, true, -1, [
                createTreeElement(2, true, 1, [
                    createTreeElement(4, true, 2),
                    createTreeElement(3, false,2)
                ])
            ])
        ];
        outTree = [
            createTreeElement(0, false),
            createTreeElement(1, true,-1, [
                createTreeElement(2, true,1, [
                    createTreeElement(4, true, 2)
                ])
            ]),
            createTreeElement(3, false)
        ];
        payload = { sectionId: 0, fileTree: outTree };
        testState(STATE.UPDATE_TREE, payload, inTree, outTree);
    });

    it("add file", () => {
        element = createTreeElement(0, false);
        inTree = [];
        outTree = [ element ];
        payload = { sectionId: 0, data:  {
            ...element,
                name: element.title
            } };
        testState(STATE.ADD_FILE, payload, inTree, outTree);

        element = createTreeElement(0, false, 1);
        inTree = [];
        outTree = [];
        payload = { sectionId: 0, data:  {
                ...element,
                name: element.title
            } };
        testState(STATE.ADD_FILE, payload, inTree, outTree);
    });

    it("add directory", () => {
        element = createTreeElement(0, true);
        inTree = [];
        outTree = [ element ];
        payload = { sectionId: 0, data:  {
                ...element,
                name: element.title
            } };
        testState(STATE.ADD_DIRECTORY, payload, inTree, outTree);

        element = createTreeElement(0, true, 1);
        inTree = [createTreeElement(1, true)];
        outTree = [ createTreeElement(1, true, -1, [
            element
        ])];
        payload = { sectionId: 0, data:  {
                ...element,
                name: element.title
            } };
        testState(STATE.ADD_DIRECTORY, payload, inTree, outTree);

        element = createTreeElement(0, true, 1);
        inTree = [createTreeElement(1, true, -1,[])];
        outTree = [ createTreeElement(1, true, -1, [
            element
        ])];
        payload = { sectionId: 0, data:  {
                ...element,
                name: element.title
            } };
        testState(STATE.ADD_DIRECTORY, payload, inTree, outTree);
    });
});
