import React, {memo, useCallback} from "react";
import ColorPicker from "rc-color-picker";
import {string, func, bool} from "prop-types";

import "rc-color-picker/assets/index.css";
import "./color-select.scss";

const ColorSelect = ({
                         id,
                         value,
                         label,
                         onChange,
                         enableAlpha = false,
                         placement = "bottomRight"
                     }) => {
    const handleChange = useCallback(data => onChange(data.color), [onChange]);

    return (
        <div className="properties-color-select">
            <ColorPicker
                enableAlpha={enableAlpha}
                color={value}
                onChange={handleChange}
                mode="RGB"
                placement={placement}
            />
            {label && (
                <span className="properties-color-select-tooltip">
                    {label}
                </span>
            )}
        </div>
    );
};

ColorSelect.propTypes = {
    id: string.isRequired,
    value: string.isRequired,
    onChange: func.isRequired,
    label: string,
    enableAlpha: bool,
    placement: string
};

export default memo(ColorSelect);
