import { connect } from 'react-redux';
import Library from "../component";
import ProjectData from "../../ProjectData";

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
        }
    }
};

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
