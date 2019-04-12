import TextField from '@material-ui/core/TextField';
import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class ProjectNameInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectName: ""
        }
    }

    onProjectNameChange = e => {
        const newName = e.target.value.match(/[\w]+/);
        const result = newName ? newName[0] : "";
        this.setState({projectName: result});
    };

    render() {
        return <TextField
            label={this.props.titleLocale}
            autoComplete="off"
            value={this.state.projectName}
            fullWidth
            onChange={this.onProjectNameChange}
            inputProps={{
                maxLength: this.props.maxLength
            }}
        />;
    }
}

ProjectNameInput.propTypes = {
    titleLocale: PropTypes.string,
    maxLength: PropTypes.number
};