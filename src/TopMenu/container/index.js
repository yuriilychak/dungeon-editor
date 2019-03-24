import { connect } from 'react-redux';
import { openTab,  closeTab } from '../action';
import TopMenu from "../component";

const mapStateToProps = (state) => {
    return {
        ...state.topMenu
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOpenTab: (id) => {
            dispatch(openTab(id));
        },
        onCloseTab: () => {
            dispatch(closeTab());
        }
    }
};

const ConTopMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenu);

export default ConTopMenu;
