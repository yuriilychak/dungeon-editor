import React, {useCallback, Fragment} from "react";
import Fade from "@material-ui/core/Fade";
import {useDropzone} from "react-dropzone";
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import RightPanel from "../../common-ui/RightPanel";
import SectionFolder from "./SectionFolder";
import Add from "@material-ui/icons/Add";
import Publish from "@material-ui/icons/Publish";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ToolButton from "./ToolButton";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        margin: 0,
        position: "relative",
        boxShadow: "none",
        outline: "none"
    },
    overflow: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: "auto"
    },
    drag: {
        border: "dashed #222222 2px",
        backgroundColor: "rgba(160,160,160,.5)",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        opacity: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        "&:hover": {
            opacity: 1,
            transition: "opacity 2s ease-in"
        }
    }
});

const Library = props => {
    const {
        locales,
        tabs,
        files,
        onAddFiles,
        onDropFiles,
        onRemoveFile,
        onAddDirectory,
        onExportProject,
        onPublishProject,
        onUpdateTree
    } = props;
    const {t} = useTranslation();
    const onDrop = useCallback(onDropFiles, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });
    const classes = useStyles();

    const addDirectoryLocale = t(locales.addDirectory);
    const addElementLocale = t(locales.addElement);
    const emptyTabLocale = t(locales.emptyTab);
    const deleteItemLocale = t(locales.itemDelete);
    const renameItemLocale = t(locales.itemRename);

    const tabViews = tabs.map(tab => (
            <SectionFolder
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
                onAddDirectory={onAddDirectory}
                onUpdateTree={onUpdateTree}
                onRemoveFile={onRemoveFile}
            />
        )
    );

    return (
        <RightPanel
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
            <div {...getRootProps({className: "dropzone"})} className={classes.root}>
                <input {...getInputProps()} />
                <div className={classes.overflow}>
                    {tabViews}
                </div>
                <Fade in={isDragActive}>
                    <div className={classes.drag}>
                        {t(locales.dropMessage)}
                    </div>
                </Fade>
            </div>
        </RightPanel>
    );
};

Library.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        locale: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    })).isRequired,
    locales: PropTypes.shape({
        addDirectory: PropTypes.string.isRequired,
        addElement: PropTypes.string.isRequired,
        addFile: PropTypes.string.isRequired,
        dropMessage: PropTypes.string.isRequired,
        emptyTab: PropTypes.string.isRequired,
        itemDelete: PropTypes.string.isRequired,
        itemRename: PropTypes.string.isRequired,
        projectExport: PropTypes.string.isRequired,
        projectPublish: PropTypes.string.isRequired,
        sectionTitle: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.object.isRequired
        )
    ),
    onAddDirectory: PropTypes.func.isRequired,
    onAddFiles: PropTypes.func.isRequired,
    onDropFiles: PropTypes.func.isRequired,
    onRemoveFile: PropTypes.func.isRequired,
    onExportProject: PropTypes.func.isRequired,
    onPublishProject: PropTypes.func.isRequired,
    onUpdateTree: PropTypes.func.isRequired
};

export default Library;
