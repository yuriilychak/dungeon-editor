import React from "react";
import { number, string, func, arrayOf, object } from "prop-types";


import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderAdd from '@material-ui/icons/CreateNewFolder';

import {ToolButton} from "../../../../common-ui/tool-button";
import { Icon } from "../../../../common-ui/icon";
import { FileTree } from "../../../../common-ui/file-tree";

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
                         onRemoveFile,
                         onRenameFile,
                         onUpdateTree
                     }) => {

    if (files.length === 0) {
        return (
            <span className="section-body-empty">
                {emptyText}
            </span>
        );
    }

    const generateNodeProps = rowInfo => {
        const { node } = rowInfo;
        const isDirectory = node.isDirectory;
        const icons = [];
        const buttons = [
            <ToolButton
                title={renameText}
                Icon={EditIcon}
                onClick={() => onRenameFile(node.id, id, node.title)}
            />,
            <ToolButton
                title={deleteText}
                Icon={DeleteIcon}
                onClick={() => onRemoveFile(node.id, id, isDirectory)}
            />
        ];

        if (isDirectory) {
            buttons.unshift(
                <ToolButton
                    title={addDirectoryText}
                    Icon={FolderAdd}
                    onClick={() => onAddDirectory(id, rowInfo)}
                />
            );
        } else {
            icons.push(
                <Icon name={`${icon}_element`}/>
            );
        }

        return {
            onClick: event => console.log(event),
            icons,
            buttons,
            className: "section-body-text"
        };
    };

    return (
        <FileTree
            treeData={files}
            onChange={fileTree => onUpdateTree(fileTree, id)}
            generateNodeProps={generateNodeProps}
        />
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
    onRemoveFile: func.isRequired,
    onRenameFile: func.isRequired,
    onUpdateTree: func.isRequired
};

export default SectionBody;
