import TextField from '@material-ui/core/TextField';
import React, {Component} from "react";
import PropTypes from 'prop-types';

const emptyString = "";

export default class ProjectNameInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectName: emptyString
        };

        this.onProjectNameChange = this.onProjectNameChange.bind(this);
    }

    onProjectNameChange(event) {
        const newName = event.target.value.match(/[\w]+/);
        const result = newName ? newName[0] : emptyString;
        this.setState({
            projectName: result
        });
    };

    render() {
        const isError = this.props.isError && this.state.projectName === emptyString;
        return (
            <TextField
                error={ isError }
                label={ isError ? this.props.errorLocale : this.props.titleLocale }
                autoComplete="off"
                value={ this.state.projectName }
                fullWidth
                onChange={ this.onProjectNameChange }
                inputProps={{
                    maxLength: this.props.maxLength
                }}
            />
        );
    }
}

ProjectNameInput.propTypes = {
    errorLocale: PropTypes.string,
    isError: PropTypes.bool,
    maxLength: PropTypes.number,
    titleLocale: PropTypes.string
};