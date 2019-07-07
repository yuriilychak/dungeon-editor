import { connect } from 'react-redux';
import { WorkingArea } from "./component";
import {selectTab, closeTab} from "./action";

const mapStateToProps = state => state.workingArea;

const mapDispatchToProps = dispatch => ({
        onSelectTab(event, index) {
            dispatch(selectTab(index));
        },
        onCloseTab(index) {
            dispatch(closeTab(index));
        },
        onGetCanvasRef(ref) {
            const app = new window.PIXI.Application({
                view: ref,
                width: ref.width,
                height: ref.height,
                backgroundColor: 0x1099bb,
                resolution: window.devicePixelRatio || 1
            });
        }
});

const ConWorkingArea = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkingArea);

export default ConWorkingArea;
