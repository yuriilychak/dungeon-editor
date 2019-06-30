import React, { memo } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import "./check-box.css";

const CheckBox = memo(({ checked, onChange, label }) => (
    <div className="check-box-wrapper">
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                />}
            label={label}
        />
    </div>
));

export default CheckBox;
