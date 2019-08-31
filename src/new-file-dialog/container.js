import { connect } from 'react-redux';
import { hideNewFileDialog, changeElementType } from './action';
import ProjectData from '../project-data/project-data';
import { NewFileDialog } from "./component";
import {addFile} from "../library/action";
import {addTab} from "../working-area/action";

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
        onSubmitPopup: (sectionId, fileName, fileType) => {
            const file = ProjectData.createFile(sectionId, fileName, fileType);
            dispatch(addFile(file, sectionId));
            dispatch(addTab(fileName, file.id, sectionId));
            dispatch(hideNewFileDialog());
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
