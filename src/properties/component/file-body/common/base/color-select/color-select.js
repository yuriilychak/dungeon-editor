import React, {memo, useCallback} from "react";
import ColorPicker from "rc-color-picker";
import {string, func, bool} from "prop-types";

import "rc-color-picker/assets/index.css";
import "./color-select.scss";

const ColorSelect = ({
                         id,
                         value,
                         onChange,
                         enableAlpha = false,
                         placement = "bottomRight",
                         children
                     }) => {
    const handleChange = useCallback(data => onChange({key: id, value: data.color}), [id, onChange]);

    return (
        <>
            <ColorPicker
                enableAlpha={enableAlpha}
                color={value}
                onChange={handleChange}
                mode="RGB"
                placement={placement}
            />
            {children}
        </>
    );
};

ColorSelect.propTypes = {
    id: string.isRequired,
    value: string.isRequired,
    onChange: func.isRequired,
    enableAlpha: bool,
    placement: string
};

export default memo(ColorSelect);
