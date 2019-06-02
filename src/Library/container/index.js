import { connect } from 'react-redux';
import Library from "../component";
import ProjectData from "../../ProjectData";
import {showExportProjectDialog} from "../../ExportProjectDialog/action";

const mapStateToProps = (state) => {
    return {
        ...state.libraryReducer
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
        onExportProject: () => {
            dispatch(showExportProjectDialog());
            ProjectData.export();
        },
        onPublishProject: () => {}
    }
};

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
