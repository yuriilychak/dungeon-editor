import React, {memo, useCallback} from "react";
import classNames from "classnames";

import VisibilityIcon from '@material-ui/icons/Visibility';
import PanToolIcon from '@material-ui/icons/PanTool';
import FormatSizeIcon from '@material-ui/icons/FormatSize';

import {ToolButton} from "../../../../../common-ui";

import "./toggle-field.scss";

const iconList = {
    "visible": VisibilityIcon,
    "interactive": PanToolIcon,
    "autoSize": FormatSizeIcon
};

const ToggleField = ({
                         id,
                         label,
                         value,
                         onChange
                     }) => {
    const handleClick = useCallback(() => onChange(!value), [value, onChange]);
    return (
        <div
            className="properties-toggle-field-root"
        >
            <div
                className={classNames(
                    "properties-toggle-field-button", {
                        "properties-toggle-field-button-unchecked": !value
                    }
                )}
            >
                <ToolButton
                    onClick={handleClick}
                    Icon={iconList[id]}
                    title={label}
                />
            </div>
        </div>
    );
};


export default memo(ToggleField);
