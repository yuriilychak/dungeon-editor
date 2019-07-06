import {connect} from 'react-redux';
import {Library} from "./component";
import {ProjectData} from "../project-data";
import {showExportProjectDialog} from "../export-project-dialog/action";
import {showRenameFileDialog} from "../rename-file-dialog/action";
import {selectLibraryElement, deleteLibraryElement} from "../properties/action";
import {removeFile} from "./action";
import * as LibraryActions from "./action";

const mapStateToProps = state => state.library;

const mapDispatchToProps = dispatch => ({
    onRemoveFile: (sectionId, fileId, isDirectory) => {
        ProjectData.removeFile(fileId, sectionId, isDirectory, () => {
            dispatch(removeFile(fileId, sectionId));
            dispatch(deleteLibraryElement(fileId, sectionId));
        });
    },
    onAddFiles: files => {
        ProjectData.addFiles(files);
    },
    onDropFiles: files => {
        ProjectData.importFiles(files);
    },
    onUpdateTree: (files, sectionId) => {
        ProjectData.refreshHierarchy(files, sectionId, () => {
            dispatch(LibraryActions.updateTree(files, sectionId));
        });
    },
    onAddDirectory: (sectionId, fileId = -1) => {
        ProjectData.addDirectory(sectionId, fileId);
    },
    onRenameFile: (sectionId, fileId) => {
        ProjectData.bindFileRename(fileId, sectionId);
        dispatch(showRenameFileDialog());
    },
    onExportProject: () => {
        dispatch(showExportProjectDialog());
        ProjectData.export();
    },
    onAddFile: sectionId => {
    },
    onPublishProject: () => {
    },
    onSelectFile: (sectionId, fileId, isDirectory) => {
        dispatch(selectLibraryElement(ProjectData.selectFile(sectionId, fileId, isDirectory)));
    }
});

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
