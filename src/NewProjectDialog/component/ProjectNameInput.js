import TextField from '@material-ui/core/TextField';
import React, { useState } from "react";


const ProjectNameInput = props => {
    const [projectName, setProjectName] = useState(props.defaultName);

    const onProjectNameChange = e => {
        const newName = e.target.value.match(/[\w]+/);
        const result = newName ? newName[0] : props.defaultName;

        if (projectName !== result) {
            props.onChange(result);
        }

        setProjectName(result);
    };

    return  <TextField
        label={props.titleLocale}
        autoComplete="off"
        value={projectName}
        fullWidth
        onChange={onProjectNameChange}
        inputProps={{
            maxLength: props.maxLength
        }}
     />;
};

export default ProjectNameInput;
