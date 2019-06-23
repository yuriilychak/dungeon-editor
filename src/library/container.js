import { connect } from 'react-redux';
import { Library } from "./component";
import {ProjectData} from "../project-data";
import {showExportProjectDialog} from "../export-project-dialog/action";
import {showRenameFileDialog} from "../rename-file-dialog/action";
import {selectLibraryElement, deleteLibraryElement} from "../properties/action";
import {removeFile} from "./action";

const mapStateToProps = (state) => {
    return {
        ...state.library
    }
};

const mapDispatchToProps = dispatch => {
    return {
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
            ProjectData.refreshHierarchy(files, sectionId);
        },
        onAddDirectory: (sectionId, fileId = -1) => {
            ProjectData.addDirectory(sectionId, fileId);
        },
        onRenameFile:(sectionId, fileId) => {
            ProjectData.bindFileRename(fileId, sectionId);
            dispatch(showRenameFileDialog());
        },
        onExportProject: () => {
            dispatch(showExportProjectDialog());
            ProjectData.export();
        },
        onAddFile: sectionId => {
        },
        onPublishProject: () => {},
        onSelectFile: (sectionId, fileId, isDirectory) => {
            ProjectData.getFileInfo(
                sectionId,
                fileId,
                isDirectory,
                data => {
                    dispatch(selectLibraryElement(data));
                });
        }
    }
};

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
