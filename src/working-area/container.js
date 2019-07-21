import {connect} from 'react-redux';
import {WorkingArea} from "./component";
import {selectTab, closeTab, zoomChange, transformReset} from "./action";

import {WorkingStage} from "../working-stage";

const mapStateToProps = state => state.workingArea;

const mapDispatchToProps = dispatch => ({
    onComponentMount() {
        WorkingStage.setZoomCallback(zoom => dispatch(zoomChange(zoom)));
    },
    onSelectTab(event, index) {
        dispatch(selectTab(index));
    },
    onCloseTab(index) {
        dispatch(closeTab(index));
    },
    onGetCanvasRef(ref) {
        WorkingStage.init(ref);
    },
    onZoomChange(event, zoom) {
        dispatch(zoomChange(zoom));
        WorkingStage.setZoom(zoom);
    },
    onTransformReset() {
        dispatch(transformReset());
        WorkingStage.setZoom();
        WorkingStage.resetPosition();
    }
});

const ConWorkingArea = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkingArea);

export default ConWorkingArea;
