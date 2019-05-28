import React, {Fragment, memo} from "react";
import Add from '@material-ui/icons/Add';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';

import ToolButton from "./ToolButton";
import Icon from "./Icon";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    title: {
        userSelect: "none",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        textAlign: "left",
        paddingLeft: 8,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    }
});

const SectionHeader = ({
                           id,
                           icon,
                           titleText,
                           addElementText,
                           addDirectoryText,
                           onAddDirectory
                       }) => (
    <Fragment>
        <Icon name={`${icon}_root`}/>
        <div className={useStyles().title}>{titleText}</div>
        <ToolButton
            title={addElementText}
            Icon={Add}
            onClick={(e) => {
                e.stopPropagation()
            }}
        />
        <ToolButton
            title={addDirectoryText}
            Icon={CreateNewFolder}
            onClick={event => {
                event.stopPropagation();
                onAddDirectory([], id);
            }}
        />
    </Fragment>
);


export default memo(SectionHeader);
