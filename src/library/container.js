import { connect } from 'react-redux';
import { Library } from "./component";
import ProjectData from "../project-data/project-data";
import {showExportProjectDialog} from "../export-project-dialog/action";
import {showRenameFileDialog} from "../rename-file-dialog/action";

const mapStateToProps = (state) => {
    return {
        ...state.library
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveFile: (id, sectionId, isDirectory) => {
            ProjectData.removeFile(id, sectionId, isDirectory);
        },
        onAddFiles: files => {
            ProjectData.addFiles(files);
        },
        onDropFiles: files => {
            ProjectData.importFiles(files);
        },
        onUpdateTree: (files, sectionId) => {
            ProjectData.refreshHierarchy(files, sectionId);
        },
        onAddDirectory: (sectionId, parent = null) => {
            ProjectData.adDirectory(sectionId, parent);
        },
        onRenameFile:(id, sectionId) => {
            ProjectData.bindFileRename(id, sectionId);
            dispatch(showRenameFileDialog());
        },
        onExportProject: () => {
            dispatch(showExportProjectDialog());
            ProjectData.export();
        },
        onPublishProject: () => {},
        onSelectFile: (id, data) => {
            console.log(id, data);
        }
    }
};

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
