import React, { useCallback, memo } from "react";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { string, func, bool } from "prop-types";

const ToolButton = ({
                        title = "",
                        onClick,
                        Icon,
                        owner,
                        disabled
                    }) => {

    const handleClick = useCallback(event => {
        event.stopPropagation();
        onClick();
    }, [onClick]);

    const hasPopup = !!title;

    const content = (
        <IconButton
            disabled={disabled}
            onClick={handleClick}
            aria-owns={owner}
            aria-haspopup={hasPopup}
        >
            <Icon/>
        </IconButton>
    );

    return hasPopup ? (
        <Tooltip title={title}>
            {content}
        </Tooltip>
    ) : content;

};

ToolButton.propTypes = {
    disabled: bool,
    title: string,
    Icon: func.isRequired,
    owner: string,
    onClick: func.isRequired
};

export default memo(ToolButton);
