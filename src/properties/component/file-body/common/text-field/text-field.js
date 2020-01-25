import React, { memo, useCallback } from "react";

import "./text-field.scss";

const TextField = ({ value, onChange }) => {
    const handleChange = useCallback(({ target }) => onChange(target.value), [onChange]);
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
