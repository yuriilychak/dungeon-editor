import { connect } from 'react-redux';
import { hideExportProjectDialog } from '../action';
import ExportProjectDialog from "../component";
import ProjectData from "../../project-data";

const mapStateToProps = (state) => {
    return {
        ...state.exportProjectDialog
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClosePopup: () => {
            dispatch(hideExportProjectDialog());
        },
        onExportProject: () => {
            ProjectData.save();
            dispatch(hideExportProjectDialog());
        }
    }
};

const ConExportProjectPopup = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportProjectDialog);

export default ConExportProjectPopup;
