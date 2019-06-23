import React from "react";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import {arrayOf, func, object} from "prop-types";

import FolderClosedIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import "./file-tree.css";

const FileTree = ({
                      treeData,
                      onChange,
                      generateNodeProps
                  }) => {

    const onGenerateNodeProps = rowInfo => {
        const { node } = rowInfo;
        const isDirectory = node.isDirectory;
        const customProps = generateNodeProps(rowInfo);

        if (isDirectory) {
            if (!customProps.icons) {
                customProps.icons = [];
            }

            customProps.icons.push(
                node.expanded ?
                    <FolderOpenIcon className="section-body-icon"/> :
                    <FolderClosedIcon className="section-body-icon"/>
            );
        }

        return customProps;
    };

    let nodeCount = 0;
    const rowHeight = 24;

    const calculateHeight = elements => {
        let result = 0;
        elements.forEach(element => {
            result += rowHeight;
            ++nodeCount;
            if (element.expanded && element.children && element.children.length !== 0) {
                result += calculateHeight(element.children);
            }
        });
        return result;
    };

    const height = calculateHeight(treeData) + nodeCount;

    return (
        <div style={{height}} className="file-tree-root">
            <SortableTree
                treeData={treeData}
                onChange={onChange}
                theme={FileExplorerTheme}
                canDrag={({node}) => !node.dragDisabled}
                canDrop={({nextParent}) => !nextParent || nextParent.isDirectory}
                scaffoldBlockPxWidth={10}
                generateNodeProps={onGenerateNodeProps}
            />
        </div>
    )
};

FileTree.propTypes = {
    treeData: arrayOf(object).isRequired,
    onChange: func.isRequired,
    generateNodeProps: func.isRequired
};

export default FileTree;
