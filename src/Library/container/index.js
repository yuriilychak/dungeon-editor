import { connect } from 'react-redux';
import Library from "../component";
import ProjectData from "../../ProjectData";

const mapStateToProps = (state) => {
    return {
        ...state.libraryReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveElement: (id) => {
            ProjectData.removeElement(id);
        },
        onRemoveParticle: (id) => {
            ProjectData.removeParticle(id);
        },
        onRemoveSkeletone: (id) => {
            ProjectData.removeSkeleton(id);
        },
        onRemoveFont: (id) => {
            ProjectData.removeFont(id);
        },
        onRemoveTexture: id => {
            ProjectData.removeTexture(id);
        },
        onAddFiles: files => {
            ProjectData.addFiles(files);
        }
    }
};

const ConLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);

export default ConLibrary;
