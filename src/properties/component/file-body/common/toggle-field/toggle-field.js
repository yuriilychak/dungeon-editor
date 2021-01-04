import React, { memo, useCallback, useMemo } from "react";
import classNames from "classnames";
import { string, bool, func } from "prop-types";

import { ToolButton, Icon } from "../../../../../common-ui";
import { STYLES } from "./constants";

import "./toggle-field.scss";

const ToggleField = ({
    id,
    label,
    value,
    disabled,
    onChange
}) => {
    const classes = useMemo(() => ({
        root: classNames(STYLES.ROOT, { [STYLES.ROOT_DISABLED]: disabled }),
        icon: classNames({ [STYLES.ICON]: !value }),
        button: classNames(STYLES.BUTTON, { [STYLES.BUTTON_UNCHECKED]: !value })
    }), [value, disabled]);

    const handleClick = useCallback(() => onChange(!value), [value, onChange]);

    const IconElement = () => <Icon name={id} className={classes.icon} />;

    return (
        <div className={classes.root}>
            <div className={classes.button}>
                <ToolButton
                    onClick={handleClick}
                    Icon={IconElement}
                    title={label}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

ToggleField.propTypes = {
    id: string.isRequired,
    value: bool.isRequired,
    disabled: bool.isRequired,
    onChange: func.isRequired,
    label: string
};

export default memo(ToggleField);
