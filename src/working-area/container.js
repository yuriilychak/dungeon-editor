import {connectStore} from "../helpers";
import {WorkingArea} from "./component";
import {selectTab, closeTab, zoomChange, transformReset, changeMode} from "./action";
import {WorkingStage} from "../working-stage";
import {openElement} from "../bottom-menu/action";

export default connectStore(
    WorkingArea,
    "workingArea",
    dispatch => ({
        onComponentMount() {
            WorkingStage.setZoomCallback(zoom => dispatch(zoomChange(zoom)));
            WorkingStage.setChangeModeCallback(() => dispatch(changeMode()));
        },
        onSelectTab(index, sectionId, fileId) {
            dispatch(selectTab(index));
            dispatch(openElement(fileId, sectionId));
            WorkingStage.showElement(sectionId, fileId);
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
        },
        onScrollStart(event) {
            WorkingStage.dispatchDragStart(event);
        },
        onScrollMove(event) {
            WorkingStage.dispatchDragMove(event);
        },
        onScrollEnd(event) {
            WorkingStage.dispatchDragEnd(event);
        },
        onCreateElement(type, posX, posY) {
            WorkingStage.createElement(type, posX, posY);
        },
        onChangeMode() {
            WorkingStage.dispatchEditModeChange();
            dispatch(changeMode());
        }
    })
);
