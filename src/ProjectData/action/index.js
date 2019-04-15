import PROJECT_DATA from "../state";

export const initNewProject = name => ({
    type: PROJECT_DATA.INIT_NEW_PROJECT,
    payload: name
});
