import React, {Fragment} from "react";
import { string, func, number, arrayOf, shape, object } from "prop-types";

import Add from "@material-ui/icons/Add";
import Publish from "@material-ui/icons/Publish";
import SaveAlt from "@material-ui/icons/SaveAlt";

import { TitledPanel, ToolButton, DropArea } from "../../common-ui";
import {Section} from "./section";
import {useLocalization} from "../../hooks";

const Library = props => {
    const {
        selectedId,
        locales,
        tabs,
        files,
        onAddFile,
        onAddFiles,
        onDropFiles,
        onRemoveFile,
        onRenameFile,
        onAddDirectory,
        onOpenFile,
        onExportProject,
        onPublishProject,
        onSelectFile,
        onUpdateTree,
        onExpansionChange
    } = props;

    const { localization, t } = useLocalization(locales);

    const tabViews = tabs.map(tab => (
            <Section
                expanded={selectedId === tab.id}
                icon={tab.icon}
                key={tab.id}
                id={tab.id}
                dropId={tab.dropId}
                addDirectoryText={localization.addDirectory}
                addElementText={localization.addElement}
                deleteText={localization.itemDelete}
                emptyText={localization.emptyTab}
                renameText={localization.itemRename}
                titleText={t(tab.locale)}
                files={files[tab.id]}
                onAddFile={onAddFile}
                onOpenFile={onOpenFile}
                onAddDirectory={onAddDirectory}
                onUpdateTree={onUpdateTree}
                onRemoveFile={onRemoveFile}
                onRenameFile={onRenameFile}
                onSelectFile={onSelectFile}
                onExpansionChange={onExpansionChange}
            />
        )
    );

    return (
        <TitledPanel
            title={t(locales.sectionTitle)}
            titleChildren={
                <Fragment>
                    <ToolButton
                        title={t(locales.addFile)}
                        Icon={Add}
                        onClick={onAddFiles}
                    />
                    <ToolButton
                        title={t(locales.projectExport)}
                        Icon={SaveAlt}
                        onClick={onExportProject}
                    />
                    <ToolButton
                        title={t(locales.projectPublish)}
                        Icon={Publish}
                        onClick={onPublishProject}
                    />
                </Fragment>
            }
        >
            <DropArea
                dropMessage={t(locales.dropMessage)}
                onDropFiles={onDropFiles}
            >
                {tabViews}
            </DropArea>
        </TitledPanel>
    );
};

Library.propTypes = {
    selectedId: number.isRequired,
    tabs: arrayOf(shape({
        id: number.isRequired,
        dropId: string.isRequired,
        locale: string.isRequired,
        icon: string.isRequired
    })).isRequired,
    locales: shape({
        addDirectory: string.isRequired,
        addElement: string.isRequired,
        addFile: string.isRequired,
        dropMessage: string.isRequired,
        emptyTab: string.isRequired,
        itemDelete: string.isRequired,
        itemRename: string.isRequired,
        projectExport: string.isRequired,
        projectPublish: string.isRequired,
        sectionTitle: string.isRequired
    }).isRequired,
    files: arrayOf(
        arrayOf(
            object.isRequired
        )
    ),
    onExpansionChange: func.isRequired,
    onAddDirectory: func.isRequired,
    onAddFile: func.isRequired,
    onAddFiles: func.isRequired,
    onDropFiles: func.isRequired,
    onRemoveFile: func.isRequired,
    onExportProject: func.isRequired,
    onPublishProject: func.isRequired,
    onOpenFile: func.isRequired,
    onRenameFile: func.isRequired,
    onSelectFile: func.isRequired,
    onUpdateTree: func.isRequired
};

export default Library;
