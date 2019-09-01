import {connect} from 'react-redux';

import {BottomMenu} from "./component";
import { changeTab } from "./action";

const mapStateToProps = state => state.bottomMenu;

const mapDispatchToProps = dispatch => ({
    onChangeTab(event, tabId) {
        dispatch(changeTab(tabId));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomMenu);
