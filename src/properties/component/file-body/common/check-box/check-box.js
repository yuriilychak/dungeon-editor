import React, { memo } from "react";
import { string, bool, func } from "prop-types";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { STYLES } from "./constants";
import { useChange } from "../../../../../hooks";

import "./check-box.scss";

export const CheckBox = ({ value, onChange, label }) => {
    const handleChange = useChange(onChange, event => event.target.checked);
    return (
        <div className={STYLES.ROOT}>
            <FormControlLabel
                classes={STYLES.LABEL}
                control={
                    <Checkbox
                        classes={STYLES.CHECK_BOX}
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
    value: bool.isRequired,
    label: string.isRequired,
    onChange: func.isRequired
};

export default memo(CheckBox);
