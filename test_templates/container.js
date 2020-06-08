export const checkContainer = (sectionId, checkList, isMockProjectData = false) => {
    jest.mock("../src/helpers", () => ({
        ...jest.requireActual("../src/helpers"),
        connectStore: (component, id, callbacks) => callbacks
    }));

    if (isMockProjectData) {
        jest.mock("../src/project-data");
    }

    describe(`GIVEN ${sectionId} container`, () => {
        const mockDispatch = jest.fn();

        const callbackGenerator = require(`../src/${sectionId}/container`);

        const callbacks = callbackGenerator.default(mockDispatch);

        beforeEach(() => {
            mockDispatch.mockClear();
        });

        checkList.forEach(({ methodKey, methodArguments = [], dispatcherData = [] }) => it(
            `WHEN call ${methodKey} method THEN dispatch should call with valid parameters ${dispatcherData.length} times`, () => {
                callbacks[methodKey](...methodArguments);

                dispatcherData.forEach(data => expect(mockDispatch).toHaveBeenCalledWith(data));
                expect(mockDispatch).toHaveBeenCalledTimes(dispatcherData.length);
            }));
    });
};