import reducer from "../reducer";
import STATE from "../state";
import { reducerTemplate } from "../../../test_templates";
import { UI_SECTION } from "../../enum";

const stateFromSection = section => ({ files: [section, [], [], [], []] });
const createTreeElement = (id, isDirectory, parentId = -1, children = undefined, customTitle = null) => ({
    id, title: customTitle || `test${id}`, parentId, children, isDirectory
});

describe("library reducer", () => {
    let inTree, outTree, payload, element;

    const { initialState, checkHandler } = reducerTemplate(reducer, UI_SECTION.LIBRARY);

    const testState = (type, data, inData, outData, message) => {
        const outState = stateFromSection(outData);
        const inState = stateFromSection(inData);
        checkHandler(type, data, outState, inState, message);
    };

    checkHandler(STATE.CLEAR, null, initialState, initialState);

    const name = "test1";
    inTree = [createTreeElement(0, false)];
    outTree = [createTreeElement(0, false,-1, undefined, name)];
    payload = {
        id: 0,
        sectionId: 0,
        name
    };
    testState(STATE.RENAME_FILE, payload, inTree, outTree, 'when rename existing file');

    inTree = [createTreeElement(0, false)];
    outTree = [createTreeElement(0, false)];
    payload = {
        id: 1,
        sectionId: 0,
        name
    };
    testState(STATE.RENAME_FILE, payload, inTree, outTree, 'when rename unexisting file');

    // REMOVE FILE
    testState(
        STATE.REMOVE_FILE,
        { sectionId: 0, id: 1 },
        [
            createTreeElement(0, false),
            createTreeElement(1, false)
        ],
        [
            createTreeElement(0, false)
        ],
        'when remove first file'
    );
    testState(
        STATE.REMOVE_FILE,
        payload,
        [
            createTreeElement(2, true,-1),
            createTreeElement(0,  true,-1, [
                createTreeElement(1, false,0)
            ])
        ],
        [
            createTreeElement(2, true,-1),
            createTreeElement(0, true,-1, [])
        ],
        'when remove second file'
    );

    // UPDATE TREE
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

    // ADD FILE
    element = createTreeElement(0, false);
    inTree = [];
    outTree = [ element ];
    payload = { sectionId: 0, data:  {
        ...element,
        name: element.title
    } };
    testState(STATE.ADD_FILE, payload, inTree, outTree, 'when add first file');

    element = createTreeElement(0, false, 1);
    inTree = [];
    outTree = [];
    payload = { sectionId: 0, data:  {
        ...element,
        name: element.title
    } };
    testState(STATE.ADD_FILE, payload, inTree, outTree, 'when add second file');

    // ADD DIRECTORY
    element = createTreeElement(0, true);
    inTree = [];
    outTree = [ element ];
    payload = { sectionId: 0, data:  {
        ...element,
        name: element.title
    } };
    testState(STATE.ADD_DIRECTORY, payload, inTree, outTree, 'when add first directory');

    element = createTreeElement(0, true, 1);
    inTree = [createTreeElement(1, true)];
    outTree = [ createTreeElement(1, true, -1, [
        element
    ])];
    payload = { sectionId: 0, data:  {
        ...element,
        name: element.title
    } };
    testState(STATE.ADD_DIRECTORY, payload, inTree, outTree, 'when add second directory');

    element = createTreeElement(0, true, 1);
    inTree = [createTreeElement(1, true, -1,[])];
    outTree = [ createTreeElement(1, true, -1, [
        element
    ])];
    payload = { sectionId: 0, data:  {
        ...element,
        name: element.title
    } };
    testState(STATE.ADD_DIRECTORY, payload, inTree, outTree, 'when add third directory');
});
