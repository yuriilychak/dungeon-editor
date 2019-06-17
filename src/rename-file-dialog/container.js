import { connect } from 'react-redux';
import { hideRenameFileDialog } from './action';
import ProjectData from '../project-data/project-data';
import { RenameFileDialog } from "./component";
import {renameFile} from "../library/action";
import {renameLibraryElement} from "../properties/action";

const mapStateToProps = (state) => {
    return {
        ...state.renameFileDialog
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClosePopup: () => {
            ProjectData.resetFileRename();
            dispatch(hideRenameFileDialog());
        },
        onSubmitRename: projectName => {
            ProjectData.renameFile(projectName, (id, sectionId, newName) => {
                dispatch(renameFile(id, sectionId, newName));
                dispatch(renameLibraryElement(id, sectionId, newName));
            });
            dispatch(hideRenameFileDialog());
        }
    }
};

const ConRenameFileDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(RenameFileDialog);

export default ConRenameFileDialog;
