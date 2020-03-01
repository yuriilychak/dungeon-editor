import React, {memo, useCallback} from "react";
import { number, string, func, arrayOf, object, bool } from "prop-types";

import {SectionHeader} from "./section-header";
import {SectionBody} from "./section-body";
import {ExpansionPanel} from "../../../common-ui";
import {SECTION_ID} from "../../../enum";

const Section = props => {
    const handleExpansionChange = useCallback(
        (event, isExpanded) => props.onExpansionChange(isExpanded ? props.id : SECTION_ID.NONE),
        [props.id, props.onExpansionChange]);
    return (
    <ExpansionPanel
        id={props.id}
        icon={`${props.icon}_root`}
        title={props.titleText}
        expanded={props.expanded}
        onChange={handleExpansionChange}
        headerContent={<SectionHeader {...props} />}
    >
        <SectionBody {...props} />
    </ExpansionPanel>
)
};

Section.propTypes = {
    expanded: bool.isRequired,
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
    onSelectFile: func.isRequired,
    onExpansionChange: func.isRequired
};

export default memo(Section);
