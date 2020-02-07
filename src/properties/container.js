import {connectStore} from "../helpers";
import { Properties } from "./component";
import {ProjectData} from "../project-data";
import {showRenameFileDialog} from "../rename-file-dialog/action";
import {selectLibraryElement, selectStageElement, changeStageElement, changeSelectedSection} from "./action";
import {WorkingStage} from "../working-stage";

export default connectStore(
    Properties,
    "properties",
    dispatch => ({
        init() {
            WorkingStage.setChangeStageElementCallback(({data}) => dispatch(changeStageElement(data)));
            WorkingStage.setSelectStageElementCallback(({data}) => dispatch(selectStageElement(data)));
        },
        onRenameFile(fileId, sectionId, isStageElement) {
            if (!isStageElement) {
                ProjectData.bindFileRename(fileId, sectionId);
            }

            dispatch(showRenameFileDialog());
        },
        onSwitchAtlas(atlasName) {
            if (ProjectData.updateAtlas(atlasName)) {
                dispatch(selectLibraryElement(ProjectData.getSelectedFile()));
            }
        },
        onSwitchCompressName() {
            if (ProjectData.toggleCompressName()) {
                dispatch(selectLibraryElement(ProjectData.getSelectedFile()));
            }
        },
        onSwitchCompressSkeleton() {
            if (ProjectData.switchFileValue("compressSkeleton")) {
                dispatch(selectLibraryElement(ProjectData.getSelectedFile()));
            }
        },
        onStageElementChange(data) {
            WorkingStage.dispatchChangeStageElement(data);
        },
        onClearAtlas() {},
        onChangeSelectedSection(sectionId) {
            dispatch(changeSelectedSection(sectionId));
        }
    })
);
