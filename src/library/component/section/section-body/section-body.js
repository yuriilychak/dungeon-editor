import React from "react";
import { number, string, func, arrayOf, object } from "prop-types";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderAdd from '@material-ui/icons/CreateNewFolder';

import { Icon } from "../../../../common-ui/icon";
import { FileTree } from "../../../../common-ui/file-tree";
import { ImagePreview } from "../../../../common-ui/image-preview";
import { SectionButton }  from "./section-button";

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
                         onRenameFile,
                         onSelectFile
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
        const {
            isDirectory,
            id: nodeId,
            title: nodeTitle,
            preview
        } = node;
        const icons = [];
        const previewHeight = 150;
        const onSelect = () => onSelectFile(id, nodeId, isDirectory);
        const buttons = [
            <SectionButton
                title={renameText}
                Icon={EditIcon}
                onClick={onRenameFile}
                fileId={nodeId}
                sectionId={id}
                userData={nodeTitle}
            />,
            <SectionButton
                title={deleteText}
                Icon={DeleteIcon}
                onClick={onRemoveFile}
                fileId={nodeId}
                sectionId={id}
                userData={isDirectory}
            />
        ];

        if (isDirectory) {
            buttons.unshift(
                <SectionButton
                    title={addDirectoryText}
                    Icon={FolderAdd}
                    onClick={onAddDirectory}
                    fileId={nodeId}
                    sectionId={id}
                />
            );
        } else {
            icons.push(
                <Icon name={`${icon}_element`}/>
            );
            if (preview) {
                buttons.push(
                    <ImagePreview
                        preview={preview}
                        height={previewHeight}
                    >
                        <div className="section-body-preview"/>
                    </ImagePreview>
                );
            }
        }

        return {
            onClick: onSelect,
            icons,
            buttons,
            className: "section-body-text"
        };
    };

    const onChange = fileTree => onUpdateTree(fileTree, id);

    return (
        <FileTree
            treeData={files}
            onChange={onChange}
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
    onUpdateTree: func.isRequired,
    onRemoveFile: func.isRequired,
    onRenameFile: func.isRequired,
    onSelectFile: func.isRequired
};

export default SectionBody;
