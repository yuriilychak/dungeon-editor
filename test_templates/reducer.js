const staticDataCache = {};

const getStaticDataFromCache = sectionId => {
    if (staticDataCache.hasOwnProperty(sectionId)) {
        return staticDataCache[sectionId];
    }

    const staticData = require(`../public/static/json/${sectionId}.json`);

    staticDataCache[sectionId] = staticData;

    return staticData;
};

export const reducerTemplate = (reducerData, reducerId) => {
    const staticData = getStaticDataFromCache(reducerId);
    const { definedState, handlers } = reducerData;

    const getState = state => ({ ...definedState, ...staticData, ...state });
    const checkCondition = (type, payload, inState, outState) => {
        const beginState = getState(inState);
        const resultState = handlers[type](beginState, payload);
        const expectState = getState(outState);
        expect(resultState).toEqual(expectState);
    };
    const getStateData = (state, index) => state[index] || {};

    const testWithMessage = (type, message, callback) =>
        it(`WHEN handle ${type} ${message ? `${message} ` : message}THEN out state should equal handler result`, callback);

    const checkHandler = (type, payload, outState = {}, inState = {}, message = '') =>
        testWithMessage(type, message, () => checkCondition(type, payload, inState, outState));

    const checkHandlerArray =  (type, payloads, outStates = [], inStates = [], message = '') => {
        testWithMessage(type, message, () =>
            payloads.forEach((payload, index) =>
                checkCondition(type, payload, getStateData(inStates, index), getStateData(outStates, index))
            )
        );
    };

    return { initialState: { ...definedState, ...staticData }, checkHandler, checkHandlerArray };
};

export const getInitialState = (reducerData, reducerId) => {
    const staticData = getStaticDataFromCache(reducerId);
    const { definedState } = reducerData;
    return { ...definedState, ...staticData };
};