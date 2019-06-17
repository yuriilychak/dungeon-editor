import { connect } from 'react-redux';
import { Properties } from "./component";
import {ProjectData} from "../project-data";
import {showRenameFileDialog} from "../rename-file-dialog/action";

const mapStateToProps = (state) => {
    return {
        ...state.properties
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRenameFile(fileId, sectionId) {
            ProjectData.bindFileRename(fileId, sectionId);
            dispatch(showRenameFileDialog());
        }
    }
};

const ConProperties = connect(
    mapStateToProps,
    mapDispatchToProps
)(Properties);

export default ConProperties;
