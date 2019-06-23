import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {string, func} from "prop-types";

const ToolButton = ({
                        title,
                        onClick,
                        Icon,
                        owner
                    }) => {

    const click = event => {
        event.stopPropagation();
        onClick();
    };

    const hasPopup = !!title;

    if (hasPopup) {
        return (
            <Tooltip title={title}>
                <IconButton
                    onClick={click}
                    aria-owns={owner}
                    aria-haspopup={hasPopup}
                >
                    <Icon/>
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <IconButton
            onClick={click}
            aria-owns={owner}
        >
            <Icon/>
        </IconButton>
    );

};

ToolButton.defultProps = {
    title: ""
};

ToolButton.propTypes = {
    title: string,
    Icon: func.isRequired,
    owner: string,
    onClick: func.isRequired
};

export default ToolButton;
