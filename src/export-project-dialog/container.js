import {connectStore} from "../helpers";
import {hideExportProjectDialog} from './action';
import {ExportProjectDialog} from "./component";
import ProjectData from "../project-data/project-data";
import {UI_SECTION} from "../enum";

export default connectStore(
    ExportProjectDialog,
    UI_SECTION.EXPORT_PROJECT_DIALOG,
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
