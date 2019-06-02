import React from "react";
import {makeStyles} from "@material-ui/styles";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";

import FolderClosedIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderAdd from '@material-ui/icons/CreateNewFolder';

import ToolButton from "./ToolButton";
import Icon from "./Icon";
import "../styles/expand-menu.css";

const useStyles = makeStyles({
    iconStyle: {
        fontSize: 16,
        color: "white"
    },
    sectionText: {
        color: "white",
        fontSize: 14
    },
    emptySection: {
        padding: "0 12px 6px 12px"
    }
});

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
                         onUpdateTree
                     }) => {
    const {iconStyle, sectionText, emptySection} = useStyles();

    if (files.length === 0) {
        return (
            <span className={emptySection}>
                {emptyText}
            </span>
        );
    }

    const generateNodeProps = rowInfo => {
        const isDirectory = rowInfo.node.isDirectory;
        const icons = [];
        const buttons = [
            <ToolButton
                title={renameText}
                Icon={EditIcon}
                onClick={() => {
                }}
            />,
            <ToolButton
                title={deleteText}
                Icon={DeleteIcon}
                onClick={onRemoveFile}
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

            icons.push(
                rowInfo.node.expanded ?
                    <FolderOpenIcon className={iconStyle}/> :
                    <FolderClosedIcon className={iconStyle}/>
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
            className: sectionText
        };
    };

    let nodeCount = 0;

    const calculateHeight = elements => {
        let result = 0;
        elements.forEach(element => {
            result += 24;
            ++nodeCount;
            if (element.expanded && element.children && element.children.length !== 0) {
                result += calculateHeight(element.children);
            }
        });
        return result;
    };

    const height = calculateHeight(files) + nodeCount;

    return (
        <div style={{height, width: "100%"}}>
            <SortableTree
                treeData={files}
                onChange={fileTree => onUpdateTree(fileTree, id)}
                theme={FileExplorerTheme}
                canDrag={({node}) => !node.dragDisabled}
                canDrop={({nextParent}) => !nextParent || nextParent.isDirectory}
                scaffoldBlockPxWidth={10}
                generateNodeProps={generateNodeProps}
            />
        </div>
    );
};

export default SectionBody;
