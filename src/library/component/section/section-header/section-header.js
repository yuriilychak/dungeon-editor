import React, { Fragment, memo } from "react";
import Add from "@material-ui/icons/Add";
import CreateNewFolder from "@material-ui/icons/CreateNewFolder";
import { number, string, func } from "prop-types";

import { ToolButton } from "../../../../common-ui/tool-button";

import "./section-header.scss";

const SectionHeader = ({
    id,
    addElementText,
    addDirectoryText,
    onAddFile,
    onAddDirectory
}) => (
    <Fragment>
        <ToolButton
            title={addElementText}
            Icon={Add}
            onClick={() => onAddFile(id)}
        />
        <ToolButton
            title={addDirectoryText}
            Icon={CreateNewFolder}
            onClick={() => onAddDirectory(id)}
        />
    </Fragment>
);

SectionHeader.propTypes = {
    id: number.isRequired,
    addElementText: string.isRequired,
    addDirectoryText: string.isRequired,
    onAddFile: func.isRequired,
    onAddDirectory: func.isRequired
};


export default memo(SectionHeader);
