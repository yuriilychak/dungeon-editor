import STATE from "./state";

export const selectLibraryElement = fileData => ({
    type: STATE.SELECT_LIBRARY_ELEMENT,
    payload: fileData
});

export const deleteLibraryElement = (id, sectionId) => ({
    type: STATE.DELETE_LIBRARY_ELEMENT,
    payload: {id, sectionId}
});

export const renameLibraryElement = (id, sectionId, name) => ({
    type: STATE.RENAME_LIBRARY_ELEMENT,
    payload: {id, sectionId, name}
});

