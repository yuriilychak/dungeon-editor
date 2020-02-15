import {connectStore} from "../helpers";
import { hideNewProjectDialog } from './action';
import ProjectData from '../project-data/project-data';
import { NewProjectDialog } from "./component";
import {UI_SECTION} from "../enum";

export default connectStore(
    NewProjectDialog,
    UI_SECTION.NEW_PROJECT_DIALOG,
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
