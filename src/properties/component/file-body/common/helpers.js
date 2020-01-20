export const generateChangeEvent = (key, value, type, fromUserData, format, data = null) => ({
    key,
    value,
    type,
    fromUserData,
    format,
    data
    });
