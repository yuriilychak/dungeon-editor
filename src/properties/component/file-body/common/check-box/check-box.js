import React, {memo, useCallback} from "react";
import {string, bool, func} from "prop-types";

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import "./check-box.scss";

const CheckBox = ({checked, onChange, label, id}) => {
    const handleChange = useCallback(event => onChange({key: id, value: event.target.checked}), [id]);
    return (
        <div className="check-box-wrapper">
            <FormControlLabel
                classes={{
                    label: "check-box-label-label",
                    root: "check-box-label-root"
                }}
                control={
                    <Checkbox
                        classes={{
                            root: "check-box-icon-root"
                        }}
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                    />}
                label={label}
            />
        </div>
    );
};

CheckBox.propTypes = {
    id: string,
    checked: bool.isRequired,
    label: string.isRequired,
    onChange: func.isRequired
};

export default memo(CheckBox);
