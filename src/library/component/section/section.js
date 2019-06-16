import React, { memo } from "react";
import { number, string, func, arrayOf, object } from "prop-types";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {SectionHeader} from "./section-header";
import {SectionBody} from "./section-body";

const Section = ({
                           id,
                           icon,
                           files,
                           addDirectoryText,
                           addElementText,
                           emptyText,
                           deleteText,
                           renameText,
                           titleText,
                           onAddDirectory,
                           onUpdateTree,
                           onRemoveFile,
                           onRenameFile
                       }) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <SectionHeader
                    id={id}
                    icon={icon}
                    titleText={titleText}
                    addDirectoryText={addDirectoryText}
                    addElementText={addElementText}
                    onAddNewFile={() => {}}
                    onAddDirectory={onAddDirectory}
                />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <SectionBody
                    id={id}
                    icon={icon}
                    files={files}
                    addDirectoryText={addDirectoryText}
                    deleteText={deleteText}
                    emptyText={emptyText}
                    renameText={renameText}
                    onAddDirectory={onAddDirectory}
                    onRemoveFile={onRemoveFile}
                    onRenameFile={onRenameFile}
                    onUpdateTree={onUpdateTree}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

Section.propTypes = {
    id: number.isRequired,
    icon: string.isRequired,
    files: arrayOf(object),
    addDirectoryText: string.isRequired,
    addElementText: string.isRequired,
    emptyText: string.isRequired,
    deleteText: string.isRequired,
    renameText: string.isRequired,
    titleText: string.isRequired,
    onAddDirectory: func.isRequired,
    onUpdateTree: func.isRequired,
    onRemoveFile: func.isRequired,
    onRenameFile: func.isRequired
};

export default memo(Section);
