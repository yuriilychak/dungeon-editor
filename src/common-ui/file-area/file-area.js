import React, { useCallback, useMemo, memo } from "react";
import classNames from "classnames";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import { string, shape, number, func } from "prop-types";

import { EMPTY_VALUE, TREE_DATA, STYLES } from "./constants";
import { canDrag, canDrop, generateNodeProps, cloneValue } from "./helpers";

import "./file-area.scss";

export const FileArea = ({
    dropId,
    value,
    onChange
}) => {
    const isEmpty = value.id === EMPTY_VALUE.id;
    const handleChangeWithClone = useCallback(data => onChange(cloneValue(data)), [onChange]);
    const closeStyle = useMemo(() => classNames(STYLES.CLOSE, { [STYLES.CLOSE_DISABLED]: isEmpty }), [isEmpty]);
    const handleChange = useCallback(data => handleChangeWithClone(data[0]), [handleChangeWithClone]);
    const handleClose = useCallback(() => handleChangeWithClone(EMPTY_VALUE), [handleChangeWithClone]);

    return (
        <div className={STYLES.ROOT}>
            <span className={STYLES.TITLE}>
                {value.title}
            </span>
            <span
                className={closeStyle}
                onClick={handleClose}
            >
                ✕
            </span>
            <div className={STYLES.DROP_AREA}>
                <SortableTree
                    maxDepth={0}
                    dndType={dropId}
                    treeData={TREE_DATA}
                    onChange={handleChange}
                    theme={FileExplorerTheme}
                    canDrag={canDrag}
                    isVirtualized={false}
                    canDrop={canDrop}
                    scaffoldBlockPxWidth={0}
                    generateNodeProps={generateNodeProps}
                    shouldCopyOnOutsideDrop
                />
            </div>
        </div>
    );
};

FileArea.propTypes = {
    value: shape({
        id: number.isRequired,
        title: string.isRequired
    }).isRequired,
    dropId: string.isRequired,
    onChange: func.isRequired
};

export default memo(FileArea);
