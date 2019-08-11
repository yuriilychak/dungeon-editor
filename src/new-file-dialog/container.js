import { connect } from 'react-redux';
import { hideNewFileDialog } from './action';
import ProjectData from '../project-data/project-data';
import { NewFileDialog } from "./component";

const mapStateToProps = (state) => {
    return {
        ...state.newFileDialog
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClosePopup: () => {
            dispatch(hideNewFileDialog());
        },
        onSubmitPopup: projectName => {
        }
    }
};

const ConTopMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewFileDialog);

export default ConTopMenu;
