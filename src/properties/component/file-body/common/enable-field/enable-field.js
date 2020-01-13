import React, {memo, useState, useCallback, useEffect} from "react";

import {CheckBox} from "../check-box";

const EnableField = ({
                         labelEnabled,
                         id,
                         value,
                         onChange,
                         children
                     }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => setEnabled(value), [value]);

    const handleChange = useCallback(data => {
        setEnabled(data.value);
        onChange(data);
    }, [onChange]);

    return (
        <>
            <CheckBox
                id={id}
                label={labelEnabled}
                checked={enabled}
                onChange={handleChange}
            />
            {enabled && (
                <>
                    {children}
                </>
            )}
        </>
    )
};

export default memo(EnableField);
