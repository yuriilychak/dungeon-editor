import { connect } from 'react-redux';
import { Properties } from "./component";
import {ProjectData} from "../project-data";
import {showRenameFileDialog} from "../rename-file-dialog/action";
import {selectLibraryElement, selectStageElement, changeStageElement} from "./action";
import {WorkingStage} from "../working-stage";

const mapStateToProps = state => ({ ...state.properties });

const mapDispatchToProps = dispatch => {
    return {
        init() {
            WorkingStage.setChangeStageElementCallback(({data}) => dispatch(changeStageElement(data)));
            WorkingStage.setSelectStageElementCallback(({data}) => dispatch(selectStageElement(data)));
        },
        onRenameFile(fileId, sectionId) {
            ProjectData.bindFileRename(fileId, sectionId);
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
        onClearAtlas() {}
    }
};

const ConProperties = connect(
    mapStateToProps,
    mapDispatchToProps
)(Properties);

export default ConProperties;
