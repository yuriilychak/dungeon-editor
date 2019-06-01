import { connect } from 'react-redux';
import Library from "../component";
import ProjectData from "../../ProjectData";
import {showExportProjectDialog} from "../../ExportProjectDialog/action";
import {closeTab} from "../../TopMenu/action";
import { updateTree } from "../action";

const mapStateToProps = (state) => {
    return {
        ...state.libraryReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveFile: (id, sectionId) => {
            ProjectData.removeFile(id, sectionId);
        },
        onAddFiles: files => {
            ProjectData.addFiles(files);
        },
        onDropFiles: files => {
            ProjectData.importFiles(files);
        },
        onUpdateTree: (files, sectionId) => {
            dispatch(updateTree(files, sectionId));
        },
        onAddDirectory: (sectionId, parent = null) => {
            ProjectData.adDirectory(sectionId, parent);
        },
        onExportProject: () => {
            dispatch(showExportProjectDialog());
            ProjectData.export();
            dispatch(closeTab());
        },
        onPublishProject: () => {}
    }
};

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
