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
        }
});

const ConWorkingArea = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkingArea);

export default ConWorkingArea;
