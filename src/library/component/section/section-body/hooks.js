import React, { useCallback } from "react";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderAdd from '@material-ui/icons/CreateNewFolder';

import { Icon } from "../../../../common-ui/icon";
import { ImagePreview } from "../../../../common-ui/image-preview";
import { SectionButton }  from "./section-button";

export const useSectionBody = (
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
) => {
    const generateNodeProps = useCallback(rowInfo => {
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
        const onOpen = () => onOpenFile(id, nodeId, isDirectory);
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
                buttons.unshift(
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
            onDoubleClick: onOpen,
            onClick: onSelect,
            icons,
            buttons,
            className: "section-body-text"
        };
    }, []);

    const onChange = useCallback(fileTree => onUpdateTree(fileTree, id), []);

    return [generateNodeProps, onChange];
};
