import React, {memo, useCallback} from "react";
import {string, bool, func} from "prop-types";

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import "./check-box.scss";
import {FIELD_TYPE} from "../../../../constants";
import {generateChangeEvent} from "../helpers";

const CheckBox = ({value, onChange, label, id, format, fromUserData}) => {
    const handleChange = useCallback(
        event => onChange(generateChangeEvent(id, event.target.checked, FIELD_TYPE.CHECKBOX, fromUserData, format)),
        [id, onChange, format, fromUserData]
    );
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
                        checked={value}
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
    value: bool.isRequired,
    label: string.isRequired,
    onChange: func.isRequired
};

export default memo(CheckBox);
