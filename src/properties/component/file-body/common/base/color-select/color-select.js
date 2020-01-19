import React, {memo, useCallback} from "react";
import ColorPicker from "rc-color-picker";
import {string, func, bool} from "prop-types";

import "rc-color-picker/assets/index.css";
import "./color-select.scss";
import {FIELD_TYPE} from "../../../../../constants";
import {generateChangeEvent} from "../../helpers";

const ColorSelect = ({
                         id,
                         value,
                         format,
                         onChange,
                         fromUserData,
                         enableAlpha = false,
                         placement = "bottomRight",
                         children
                     }) => {
    const handleChange = useCallback(
        data => onChange(generateChangeEvent(id, data.color, FIELD_TYPE.COLOR, fromUserData, format)),
        [id, fromUserData, format, onChange]
    );

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
