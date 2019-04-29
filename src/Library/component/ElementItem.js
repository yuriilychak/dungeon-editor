import React from "react";
import {makeStyles} from '@material-ui/styles';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
    root: {
        width: "100%",
        minHeight: 24,
        height: 24,
        padding: 0,
        borderBottom: "1px solid #595a5f"
    },
    text: {
        userSelect: "none",
        flexGrow: 1,
        textAlign: "left",
        paddingLeft: 4,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    button: {
        fontSize: 20,
        padding: 0
    },
    icon: {
        fontSize: 20,
        fill: "#ffffff"
    }
});

const ElementItem = props => {
    const classes = useStyles();
    return <Toolbar className={classes.root}>
        <ImageIcon className={classes.icon} />
        <span className={classes.text}>
         {props.name}
        </span>
        <Tooltip title="Rename">
            <IconButton className={classes.button}>
                <EditIcon className={classes.icon} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
        <IconButton className={classes.button} onClick={() => {props.onRemoveElement(props.id)}}>
            <DeleteIcon className={classes.icon} />
        </IconButton>
        </Tooltip>
    </Toolbar>
};

export default ElementItem;
