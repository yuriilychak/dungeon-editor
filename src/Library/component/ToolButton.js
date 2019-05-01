import React from "react";
import {makeStyles} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
    button: {
        fontSize: 20,
        padding: 0
    },
    icon: {
        fontSize: 20,
        fill: "#ffffff"
    }
});

const ToolButton = ({title, onClick, Icon}) => {
    const classes = useStyles();
    return (
        <Tooltip title={title}>
            <IconButton className={classes.button} onClick={onClick}>
                <Icon className={classes.icon} />
            </IconButton>
        </Tooltip>
    );
};

export default ToolButton;
