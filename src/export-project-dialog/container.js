import {connectStore} from "../helpers";
import {hideExportProjectDialog} from './action';
import {ExportProjectDialog} from "./component";
import ProjectData from "../project-data/project-data";

export default connectStore(
    ExportProjectDialog,
    "exportProjectDialog",
    dispatch => ({
        onClosePopup: () => {
            dispatch(hideExportProjectDialog());
        },
        onExportProject: () => {
            ProjectData.save();
            dispatch(hideExportProjectDialog());
        }
    })
);
