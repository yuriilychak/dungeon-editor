import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
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

import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import "../styles/expand-menu.css";
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles({
    title: {
        userSelect: "none",
        flexGrow: 1,
        textAlign: "left",
        paddingLeft: 8,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    iconStyle: {
        fontSize: 16,
        color: "white"
    },
    sectionStyle: {
        color: "white",
        fontSize: 14
    },
    root: {
        width: "(100% - 20px)",
        marginRight: 20,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    },
    emptySectionText: {
        padding: "0 12px 6px 12px"
    }
});

const SectionFolder = ({
                           title,
                           emptyText,
                           id,
                           icon,
                           files,
                           deleteText,
                           renameText,
                           onAddDirectory,
                           onUpdateTree,
                           onRemoveFile
                       }) => {
    const classes = useStyles();

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
                    title={"add new folder"}
                    Icon={FolderAdd}
                    onClick={() => {
                    }}
                />
            );

            icons.push(
                rowInfo.node.expanded ?
                    <FolderOpenIcon className={classes.iconStyle}/> :
                    <FolderClosedIcon className={classes.iconStyle}/>
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
            className: classes.sectionStyle
        };
    };

    const calculateHeight = elements => {
        let result = 0;
        elements.forEach(element => {
            result += 24;
            if (element.expanded) {
                result += calculateHeight(element.children);
            }
        });
        return result;
    };

    let height = calculateHeight(files) + 6;


    const content = files.length !== 0 ? (
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
    ) : <span className={classes.emptySectionText}>{emptyText}</span>;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <Icon name={`${icon}_root`}/>
                <span className={classes.title}>{title}</span>
                <ToolButton
                    title={"add new element"}
                    Icon={Add}
                    fontSize={16}
                    padding={2}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                />
                <ToolButton
                    title={"add new folder"}
                    Icon={CreateNewFolder}
                    fontSize={16}
                    padding={2}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddDirectory([], id);
                    }}
                />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {content}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default React.memo(SectionFolder);
