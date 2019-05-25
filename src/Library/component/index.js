import React, {useCallback} from 'react';
import Fade from '@material-ui/core/Fade';
import {useDropzone} from 'react-dropzone';
import {makeStyles} from '@material-ui/styles';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

import ContentFolder from "./ContentFolder";

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
        '&:hover': {
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
        onRemoveFile
    } = props;
    const {t} = useTranslation();
    const onDrop = useCallback(onAddFiles, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });
    const classes = useStyles();

    const emptyTabLocale = t(locales.emptyTab);
    const deleteItemLocale = t(locales.itemDelete);
    const renameItemLocale = t(locales.itemRename);

    const tabViews = tabs.map(tab => (
            <ContentFolder
                title={t(tab.locale)}
                icon={tab.icon}
                key={tab.id}
                id={tab.id}
                emptyText={emptyTabLocale}
                files={files[tab.id]}
                deleteText={deleteItemLocale}
                renameText={renameItemLocale}
                onRemoveElement={onRemoveFile}
            />
        )
    );

    return (
        <div {...getRootProps({className: 'dropzone'})} className={classes.root}>
            <input {...getInputProps()} />
            <div className={classes.overflow}>
                {tabViews}
            </div>
            <Fade in={isDragActive}>
                <div className={classes.drag}>
                    Drop the files here ...
                </div>
            </Fade>
        </div>
    );
};

Library.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        locale: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    })).isRequired,
    locales: PropTypes.shape({
        emptyTab: PropTypes.string.isRequired,
        itemDelete: PropTypes.string.isRequired,
        itemRename: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.object.isRequired
        )
    )
};

export default Library;
