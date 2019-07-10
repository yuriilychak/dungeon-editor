import { connect } from 'react-redux';
import { WorkingArea } from "./component";
import {selectTab, closeTab} from "./action";

import { WorkingStage } from "../working-stage";

const mapStateToProps = state => state.workingArea;

const mapDispatchToProps = dispatch => ({
        onSelectTab(event, index) {
            dispatch(selectTab(index));
        },
        onCloseTab(index) {
            dispatch(closeTab(index));
        },
        onGetCanvasRef(ref) {
            WorkingStage.init(ref);
        }
});

const ConWorkingArea = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkingArea);

export default ConWorkingArea;
