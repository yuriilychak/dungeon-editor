import {connect} from 'react-redux';
import {Library} from "./component";
import {ProjectData} from "../project-data";
import {showExportProjectDialog} from "../export-project-dialog/action";
import {showRenameFileDialog} from "../rename-file-dialog/action";
import {showNewFileDialog} from "../new-file-dialog/action";
import {selectLibraryElement, deleteLibraryElement} from "../properties/action";
import {removeFile} from "./action";
import * as LibraryActions from "./action";
import { SECTION_ID } from "../enum";

const mapStateToProps = state => state.library;

const mapDispatchToProps = dispatch => ({
    onRemoveFile: (sectionId, fileId, isDirectory) => {
        ProjectData.removeFile(fileId, sectionId, isDirectory, () => {
            dispatch(removeFile(fileId, sectionId));
            dispatch(deleteLibraryElement(fileId, sectionId));
        });
    },
    onAddFiles: () => {
        ProjectData.addFiles();
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
        if (
            sectionId === SECTION_ID.ELEMENT ||
            sectionId === SECTION_ID.PARTICLE ||
            sectionId === SECTION_ID.TILE_MAP
        ) {
            dispatch(showNewFileDialog(sectionId));
        } else {
            ProjectData.addFiles();
        }
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
