import {connect} from 'react-redux';
import {WorkingArea} from "./component";
import {selectTab, closeTab, zoomChange, transformReset} from "./action";

import {WorkingStage} from "../working-stage";
import {openElement} from "../bottom-menu/action";

const mapStateToProps = state => state.workingArea;

const mapDispatchToProps = dispatch => ({
    onComponentMount() {
        WorkingStage.setZoomCallback(zoom => dispatch(zoomChange(zoom)));
    },
    onSelectTab(index, sectionId, fileId) {
        dispatch(selectTab(index));
        dispatch(openElement(fileId, sectionId));
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
