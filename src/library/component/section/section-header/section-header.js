import React, {Fragment, memo} from "react";
import Add from "@material-ui/icons/Add";
import CreateNewFolder from "@material-ui/icons/CreateNewFolder";
import {number, string, func} from "prop-types";

import {ToolButton} from "../../../../common-ui/tool-button";
import {Icon} from "../../../../common-ui/icon";

import "./section-header.css";

const SectionHeader = ({
                           id,
                           icon,
                           titleText,
                           addElementText,
                           addDirectoryText,
                           onAddFile,
                           onAddDirectory
                       }) => (
    <Fragment>
        <Icon name={`${icon}_root`}/>
        <div className="library-section-header-title">
            {titleText}
        </div>
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
    icon: string.isRequired,
    titleText: string.isRequired,
    addElementText: string.isRequired,
    addDirectoryText: string.isRequired,
    onAddFile: func.isRequired,
    onAddDirectory: func.isRequired
};


export default memo(SectionHeader);
