import { connect } from 'react-redux';
import { changeDialogVisible } from '../action';
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
        onSubmitProject: (data) => {
            dispatch(changeDialogVisible(false));
        }
    }
};

const ConTopMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProjectDialog);

export default ConTopMenu;
