import { connect } from 'react-redux';
import { hideNewProjectDialog } from '../action';
import ProjectData from '../../ProjectData';
import NewProjectDialog from "../component";

const mapStateToProps = (state) => {
    return {
        ...state.newProjectDialog
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClosePopup: () => {
            dispatch(hideNewProjectDialog());
        },
        onSubmitProject: projectName => {
            ProjectData.rename(projectName);
            dispatch(hideNewProjectDialog());
        }
    }
};

const ConTopMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProjectDialog);

export default ConTopMenu;
