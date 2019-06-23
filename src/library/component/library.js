import React, {Fragment} from "react";
import { string, func, number, arrayOf, shape, object } from "prop-types";
import {useTranslation} from "react-i18next";

import Add from "@material-ui/icons/Add";
import Publish from "@material-ui/icons/Publish";
import SaveAlt from "@material-ui/icons/SaveAlt";

import { TitledPanel } from "../../common-ui/titled-panel";
import {ToolButton} from "../../common-ui/tool-button";
import {DropArea} from "../../common-ui/drop-area";
import {Section} from "./section";

const Library = props => {
    const {
        locales,
        tabs,
        files,
        onAddFile,
        onAddFiles,
        onDropFiles,
        onRemoveFile,
        onRenameFile,
        onAddDirectory,
        onExportProject,
        onPublishProject,
        onSelectFile,
        onUpdateTree
    } = props;
    const {t} = useTranslation();

    const addDirectoryLocale = t(locales.addDirectory);
    const addElementLocale = t(locales.addElement);
    const emptyTabLocale = t(locales.emptyTab);
    const deleteItemLocale = t(locales.itemDelete);
    const renameItemLocale = t(locales.itemRename);

    const tabViews = tabs.map(tab => (
            <Section
                icon={tab.icon}
                key={tab.id}
                id={tab.id}
                addDirectoryText={addDirectoryLocale}
                addElementText={addElementLocale}
                deleteText={deleteItemLocale}
                emptyText={emptyTabLocale}
                renameText={renameItemLocale}
                titleText={t(tab.locale)}
                files={files[tab.id]}
                onAddFile={onAddFile}
                onAddDirectory={onAddDirectory}
                onUpdateTree={onUpdateTree}
                onRemoveFile={onRemoveFile}
                onRenameFile={onRenameFile}
                onSelectFile={onSelectFile}
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
    tabs: arrayOf(shape({
        id: number.isRequired,
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
    onAddDirectory: func.isRequired,
    onAddFiles: func.isRequired,
    onDropFiles: func.isRequired,
    onRemoveFile: func.isRequired,
    onExportProject: func.isRequired,
    onPublishProject: func.isRequired,
    onRenameFile: func.isRequired,
    onSelectFile: func.isRequired,
    onUpdateTree: func.isRequired
};

export default Library;
