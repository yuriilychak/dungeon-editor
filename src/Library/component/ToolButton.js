import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const ToolButton = ({
                        title,
                        onClick,
                        Icon,
                        owner,
                        hasPopup,
                        fontSize = 14,
                        padding = 0
                    }) => (
    <Tooltip title={title}>
        <IconButton
            style={{
                fontSize,
                padding
            }}
            onClick={onClick}
            aria-owns={owner}
            aria-haspopup={hasPopup}
        >
            <Icon style={{
                fontSize,
                fill: "#ffffff"
            }}/>
        </IconButton>
    </Tooltip>
);

export default ToolButton;
