import React, { memo, useCallback } from "react";
import classNames from "classnames";
import { string, bool, func } from "prop-types";

import { ToolButton } from "../../../../../common-ui";
import { ICONS, STYLES } from "./constants";

import "./toggle-field.scss";

const ToggleField = ({
                         id,
                         label,
                         value,
                         onChange
                     }) => {
    const handleClick = useCallback(() => onChange(!value), [value, onChange]);

    return (
        <div className={STYLES.ROOT}>
            <div className={classNames(STYLES.BUTTON, { [STYLES.BUTTON_UNCHECKED]: !value })}>
                <ToolButton
                    onClick={handleClick}
                    Icon={ICONS[id]}
                    title={label}
                />
            </div>
        </div>
    );
};

ToggleField.propTypes = {
    id: string.isRequired,
    value: bool.isRequired,
    onChange: func.isRequired,
    label: string
};

export default memo(ToggleField);
