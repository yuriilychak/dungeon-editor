import { connectStore } from "../helpers";
import { hideRenameFileDialog } from './action';
import ProjectData from '../project-data/project-data';
import { RenameFileDialog } from "./component";
import { renameFile } from "../library/action";
import { renameLibraryElement } from "../properties/action";
import { checkRename } from "../working-area/action";
import { WorkingStage } from "../working-stage";
import { UI_SECTION } from "../enum";

export default connectStore(
    RenameFileDialog,
    UI_SECTION.RENAME_FILE_DIALOG,
    dispatch => ({
        onClosePopup: () => {
            ProjectData.resetFileRename();
            dispatch(hideRenameFileDialog());
        },
        onSubmitRename: nextName => {
            if (ProjectData.isRenameBinded()) {
                ProjectData.renameFile(nextName, (id, sectionId, newName) => {
                    dispatch(renameFile(id, sectionId, newName));
                    dispatch(renameLibraryElement(id, sectionId, newName));
                    dispatch(checkRename(id, sectionId, newName));
                });
            }
            else {
                WorkingStage.dispatchChangeStageElement({ key: "name", value: nextName });
            }

            dispatch(hideRenameFileDialog());
        }
    })
);
