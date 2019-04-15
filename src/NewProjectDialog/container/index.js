import { connect } from 'react-redux';
import { changeDialogVisible } from '../action';
import { initNewProject } from '../../ProjectData/action';
import NewProjectDialog from "../component";

const mapStateToProps = (state) => {
    return {
        ...state.newProjectDialog
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClosePopup: () => {
            dispatch(changeDialogVisible(false));
        },
        onSubmitProject: projectName => {
            dispatch(initNewProject(projectName));
            dispatch(changeDialogVisible(false));
        }
    }
};

const ConTopMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProjectDialog);

export default ConTopMenu;
