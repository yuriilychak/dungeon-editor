import { connect } from 'react-redux';
import { hideRenameFileDialog } from './action';
import ProjectData from '../project-data';
import { RenameFileDialog } from "./component";

const mapStateToProps = (state) => {
    return {
        ...state.renameFileDialog
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClosePopup: () => {
            ProjectData.resetFileRename();
            dispatch(hideRenameFileDialog());
        },
        onSubmitRename: projectName => {
            ProjectData.renameFile(projectName);
            dispatch(hideRenameFileDialog());
        }
    }
};

const ConRenameFileDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(RenameFileDialog);

export default ConRenameFileDialog;
