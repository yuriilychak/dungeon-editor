import React from "react";
import {number, string, func, arrayOf, object} from "prop-types";

import {FileTree} from "../../../../common-ui/file-tree";
import {useSectionBody} from "./hooks";

import "./section-body.css";

const SectionBody = ({
                         id,
                         files,
                         icon,
                         emptyText,
                         renameText,
                         deleteText,
                         addDirectoryText,
                         onAddDirectory,
                         onUpdateTree,
                         onRemoveFile,
                         onOpenFile,
                         onRenameFile,
                         onSelectFile
                     }) => {

    const [generateNodeProps, onChange] = useSectionBody(
        id,
        icon,
        renameText,
        deleteText,
        addDirectoryText,
        onUpdateTree,
        onSelectFile,
        onOpenFile,
        onRenameFile,
        onRemoveFile,
        onAddDirectory
    );

    return files.length !== 0 ? (
        <FileTree
            treeData={files}
            onChange={onChange}
            generateNodeProps={generateNodeProps}
        />
    ) : (
        <span className="section-body-empty">
            {emptyText}
        </span>
    );
};

SectionBody.propTypes = {
    id: number.isRequired,
    files: arrayOf(object).isRequired,
    icon: string.isRequired,
    emptyText: string.isRequired,
    renameText: string.isRequired,
    deleteText: string.isRequired,
    addDirectoryText: string.isRequired,
    onAddDirectory: func.isRequired,
    onUpdateTree: func.isRequired,
    onOpenFile: func.isRequired,
    onRemoveFile: func.isRequired,
    onRenameFile: func.isRequired,
    onSelectFile: func.isRequired
};

export default SectionBody;
