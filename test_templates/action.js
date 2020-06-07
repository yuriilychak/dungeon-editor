export const checkAction = (inputAction, type, payload = null, message = '') => {
    it(
        `WHEN check ${type} action${message ? ` WITH ${message}` : message} THEN result should equal expected object`,
        () => expect(inputAction).toEqual({ type, payload })
    );
};