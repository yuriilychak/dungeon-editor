import React, {memo} from "react";
import {number, string, func, arrayOf, object} from "prop-types";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {SectionHeader} from "./section-header";
import {SectionBody} from "./section-body";

const Section = (props) => (
    <ExpansionPanel>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
        >
            <SectionHeader {...props} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <SectionBody {...props} />
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

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
    onAddFile: func.isRequired,
    onOpenFile: func.isRequired,
    onAddDirectory: func.isRequired,
    onUpdateTree: func.isRequired,
    onRemoveFile: func.isRequired,
    onRenameFile: func.isRequired,
    onSelectFile: func.isRequired
};

export default memo(Section);
