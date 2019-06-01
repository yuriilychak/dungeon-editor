import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    iconButton: {
        padding: 0
    },
    icon: {
        fontSize: 14,
        fill: "#ffffff"
    }
});

const ToolButton = ({
                        title,
                        onClick,
                        Icon,
                        owner,
                        hasPopup,
                    }) => {
    const {iconButton, icon} = useStyles();
    return (
        <Tooltip title={title}>
            <IconButton
                className={iconButton}
                onClick={event => {
                    event.stopPropagation();
                    onClick();
                }}
                aria-owns={owner}
                aria-haspopup={hasPopup}
            >
                <Icon className={icon}/>
            </IconButton>
        </Tooltip>
    );
};

export default ToolButton;
