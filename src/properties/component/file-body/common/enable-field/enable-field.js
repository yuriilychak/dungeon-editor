import React, {memo, useState, useCallback, useEffect} from "react";

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import {ToolButton} from "../../../../../common-ui";

const EnableField = ({
                         labelEnabled,
                         value,
                         onChange,
                         children
                     }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => setEnabled(value), [value]);

    const handleChange = useCallback(() => {
        const nextEnabled = !enabled;
        setEnabled(nextEnabled);
        onChange(nextEnabled);
    }, [enabled, onChange]);

    return (
        <>
            <ToolButton
                className="properties-enable-field-toggle"
                title={labelEnabled}
                Icon={enabled ? RadioButtonCheckedIcon : RadioButtonUncheckedIcon}
                onClick={handleChange}
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
