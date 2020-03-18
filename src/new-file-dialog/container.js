import { connectStore } from "../helpers";
import { hideNewFileDialog, changeElementType } from './action';
import ProjectData from '../project-data/project-data';
import WorkingStage from "../working-stage/working-stage";
import { NewFileDialog } from "./component";
import { addFile } from "../library/action";
import { addTab } from "../working-area/action";
import { openElement } from "../bottom-menu/action";
import { UI_SECTION } from "../enum";

export default connectStore(
    NewFileDialog,
    UI_SECTION.NEW_FILE_DIALOG,
    dispatch => ({
        onClosePopup: () => {
            dispatch(hideNewFileDialog());
        },
        onSubmitPopup: (sectionId, fileName, fileType) => {
            const file = ProjectData.createFile(sectionId, fileName, fileType);
            WorkingStage.createUIElement(fileType, file.id, fileName);

            dispatch(addFile(file, sectionId));
            dispatch(addTab(fileName, file.id, sectionId));
            dispatch(openElement(file.id, sectionId));
            dispatch(hideNewFileDialog());
        },
        onChangeType: typeId => {
            dispatch(changeElementType((typeId)));
        }
    })
);
