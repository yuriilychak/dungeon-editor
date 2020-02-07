import {connectStore} from "../helpers";
import { hideNewProjectDialog } from './action';
import ProjectData from '../project-data/project-data';
import { NewProjectDialog } from "./component";

export default connectStore(
    NewProjectDialog,
    "newProjectDialog",
    dispatch => ({
        onClosePopup: () => {
            dispatch(hideNewProjectDialog());
        },
        onSubmitProject: projectName => {
            ProjectData.rename(projectName);
            dispatch(hideNewProjectDialog());
        }
    })

);
