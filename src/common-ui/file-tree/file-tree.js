import React, {memo} from "react";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import {arrayOf, func, object, bool, number, string} from "prop-types";

import {useFileTree} from "./hooks";

import "./file-tree.scss";

export const FileTree = ({
                             dndType,
                             treeData,
                             onChange,
                             generateNodeProps,
                             shouldCopyOnOutsideDrop,
                             maxDepth,
                             minHeight = 0,
                             scaffoldBlockPxWidth = 10
                         }) => {
    const [treeHeight, canDrag, canDrop, onGenerateNodeProps] = useFileTree(treeData, generateNodeProps);

    return (
        <div style={{height: Math.max(treeHeight, minHeight)}} className="file-tree-root">
            <SortableTree
                maxDepth={maxDepth}
                dndType={dndType}
                treeData={treeData}
                onChange={onChange}
                theme={FileExplorerTheme}
                canDrag={canDrag}
                canDrop={canDrop}
                scaffoldBlockPxWidth={scaffoldBlockPxWidth}
                generateNodeProps={onGenerateNodeProps}
                shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
            />
        </div>
    )
};

FileTree.propTypes = {
    dndType: string,
    maxDepth: number,
    scaffoldBlockPxWidth: number,
    minHeight: number,
    treeData: arrayOf(object).isRequired,
    onChange: func.isRequired,
    shouldCopyOnOutsideDrop: bool,
    generateNodeProps: func.isRequired
};

export default memo(FileTree);
