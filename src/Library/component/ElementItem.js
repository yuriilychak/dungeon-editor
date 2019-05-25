import React from "react";
import {makeStyles} from '@material-ui/styles';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ToolButton from "./ToolButton";
import Icon from "./Icon";

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
    preview: {
        maxWidth: 70,
        height: "auto"
    }
});

const ElementItem = ({
                         name,
                         id,
                         hasPreview,
                         onRemoveElement,
                         source,
                         deleteText,
                         renameText,
                         icon,
                         sectionId

}) => {
    const { root, text, preview} = useStyles();

    const result = (
        <Toolbar className={root}>
            <Icon name={`${icon}_element`}/>
            <span className={text}>
             {name}
            </span>
            <ToolButton
                title={renameText}
                Icon={EditIcon}
                onClick={() => {}}
            />
            <ToolButton
                title={deleteText}
                Icon={DeleteIcon}
                onClick={() => {onRemoveElement(id, sectionId)}}
            />
        </Toolbar>
    );

    return hasPreview ?
        <Tooltip
            title={
                <img
                    src={source}
                    className={preview}
                    alt={"empty Preview"}
                />
            }
            placement={"left"}>
            {result}
        </Tooltip> :
        result;
};

export default ElementItem;
