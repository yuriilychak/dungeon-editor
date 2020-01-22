import React, { memo, useCallback } from "react";

import {generateChangeEvent} from "../helpers";
import {FIELD_TYPE} from "../../../../constants";

import "./text-field.scss";

const TextField = ({
    id,
    value,
    fromUserData,
    format,
    onChange
                   }) => {
    const handleChange = useCallback(
        ({ target }) => onChange(generateChangeEvent(id, target.value, FIELD_TYPE.TEXT, fromUserData, format)),
        [id, fromUserData, format, onChange]);
    return (
        <textarea
            spellcheck="false"
            className="properties-text-filed"
            value={value}
            onChange={handleChange}
        />
)
};

export default memo(TextField);
