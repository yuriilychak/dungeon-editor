import React from "react";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import {arrayOf, func, object} from "prop-types";

import { useFileTree } from "./hooks";

import "./file-tree.css";

const FileTree = ({
                      treeData,
                      onChange,
                      generateNodeProps
                  }) => {
    const [treeHeight, canDrag, canDrop, onGenerateNodeProps] = useFileTree(treeData, generateNodeProps);

    return (
        <div style={{height: treeHeight}} className="file-tree-root">
            <SortableTree
                treeData={treeData}
                onChange={onChange}
                theme={FileExplorerTheme}
                canDrag={canDrag}
                canDrop={canDrop}
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
