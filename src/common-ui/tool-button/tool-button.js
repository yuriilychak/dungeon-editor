import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { string, func, bool } from "prop-types";

const ToolButton = ({
                        title,
                        onClick,
                        Icon,
                        owner,
                        hasPopup,
                    }) => (
    <Tooltip title={title}>
        <IconButton
            onClick={event => {
                event.stopPropagation();
                onClick();
            }}
            aria-owns={owner}
            aria-haspopup={hasPopup}
        >
            <Icon/>
        </IconButton>
    </Tooltip>
);

ToolButton.defultProps = {
    title: "Unknown",
    hasPopup: false
};

ToolButton.propTypes = {
    title: string,
    hasPopup: bool,
    Icon: func.isRequired,
    owner: string,
    onClick: func
};

export default ToolButton;
