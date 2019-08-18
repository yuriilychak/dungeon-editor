import { connect } from 'react-redux';
import { hideNewFileDialog, changeElementType } from './action';
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
        },
        onChangeType: typeId => {
            dispatch(changeElementType((typeId)));
        }
    }
};

const ConTopMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewFileDialog);

export default ConTopMenu;
