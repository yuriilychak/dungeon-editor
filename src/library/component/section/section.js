import React, {memo} from "react";
import {number, string, func, arrayOf, object} from "prop-types";

import {SectionHeader} from "./section-header";
import {SectionBody} from "./section-body";
import {ExpansionPanel} from "../../../common-ui";

const Section = props => (
    <ExpansionPanel
        id={props.id}
        icon={`${props.icon}_root`}
        title={props.titleText}
        headerContent={<SectionHeader {...props} />}
    >
        <SectionBody {...props} />
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
