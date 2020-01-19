import React, {memo, useState, useCallback, useEffect} from "react";

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import {ToolButton} from "../../../../../common-ui";
import {FIELD_TYPE} from "../../../../constants";
import {generateChangeEvent} from "../helpers";

const EnableField = ({
                         labelEnabled,
                         id,
                         value,
                         format,
                         onChange,
                         fromUserData,
                         children
                     }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => setEnabled(value), [value]);

    const handleChange = useCallback(() => {
        const nextEnabled = !enabled;
        setEnabled(nextEnabled);
        onChange(generateChangeEvent(id, nextEnabled, FIELD_TYPE.ENABLED, fromUserData, format));
    }, [id, enabled, fromUserData, format, onChange]);

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
