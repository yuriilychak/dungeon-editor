import React, { memo } from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SectionHeader from "./SectionHeader";
import SectionBody from "./SectionBody";

const SectionFolder = ({
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
                           onRemoveFile
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
                    onRemoveFile={onRemoveFile}
                    onUpdateTree={onUpdateTree}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default memo(SectionFolder);
