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
        onRemoveFile: (id, sectionId, isDirectory) => {
            ProjectData.removeFile(id, sectionId, isDirectory, () => {
                dispatch(removeFile(id, sectionId));
                dispatch(deleteLibraryElement(id, sectionId));
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
