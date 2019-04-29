import { connect } from 'react-redux';
import Library from "../component";

const mapStateToProps = (state) => {
    return {
        ...state.libraryReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveFile: () => {
        },
        onAddFiles: () => {
        }
    }
};

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
