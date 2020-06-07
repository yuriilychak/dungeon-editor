import { connectStore } from "../helpers";
import { hideExportProjectDialog } from "./action";
import { ExportProjectDialog } from "./component";
import { ProjectData } from "../project-data";
import { UI_SECTION } from "../enum";

export default connectStore(
    ExportProjectDialog,
    UI_SECTION.EXPORT_PROJECT_DIALOG,
    dispatch => {
        const onClosePopup = () => dispatch(hideExportProjectDialog());

        return {
            onClosePopup,
            onExportProject: () => {
                ProjectData.save();
                onClosePopup();
            }
        };
    }
);
