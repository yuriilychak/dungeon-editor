import React, {memo, useState, useCallback, useEffect} from "react";
import classNames from "classnames";

import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import {ToolButton} from "../../../../../common-ui";

import "./enable-field.scss"

const EnableField = ({
                         label,
                         value,
                         disabled,
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
                disabled={disabled}
                title={label}
                Icon={enabled ? RadioButtonCheckedIcon : RadioButtonUncheckedIcon}
                onClick={handleChange}
            />
            <div
                className={
                    classNames("properties-enable-field", {"properties-enable-field-deselected": !enabled})
                }
            >
                {children}
            </div>
        </>
    )
};

export default memo(EnableField);
