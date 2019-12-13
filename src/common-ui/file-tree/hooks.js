import React, { useCallback, useMemo } from "react";

import FolderClosedIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

const rowHeight = 24;

const className = "section-body-icon";

const calculateHeight = elements => {
    let result = 0;
    elements.forEach(element => {
        result += rowHeight + 1;
        if (element.expanded && element.children && element.children.length !== 0) {
            result += calculateHeight(element.children);
        }
    });
    return result;
};

export const useFileTree = (treeData, generateNodeProps) => {
    const onGenerateNodeProps = useCallback(rowInfo => {
        const { node } = rowInfo;
        const isDirectory = node.isDirectory;
        const customProps = generateNodeProps(rowInfo);

        if (isDirectory) {
            if (!customProps.icons) {
                customProps.icons = [];
            }

            customProps.icons.push(
                node.expanded ?
                    <FolderOpenIcon className={className}/> :
                    <FolderClosedIcon className={className}/>
            );
        }

        return customProps;
    }, [generateNodeProps]);

    const treeHeight = useMemo(() => calculateHeight(treeData), [treeData]);
    const canDrag = useCallback(({node}) => !node.dragDisabled, []);
    const canDrop = useCallback(({nextParent}) => !nextParent || nextParent.isDirectory, []);

    return [treeHeight, canDrag, canDrop, onGenerateNodeProps];
};
