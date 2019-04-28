import React, { useCallback } from 'react';
import Fade from '@material-ui/core/Fade';
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';

import ContentFolder from "./ContentFolder";
import TextureIcon from "../data/icon/texture.svg";
import SkeletonIcon from "../data/icon/skeleton.svg";
import ParticleIcon from "../data/icon/particle.svg";
import ElementIcon from "../data/icon/element.svg";
import FontIcon from "../data/icon/font.svg";

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
    const onDrop = useCallback(acceptedFiles => {
        console.log("file", acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });
    const classes = useStyles();

    return (
        <div {...getRootProps({className: 'dropzone'})} className={classes.root}>
            <input {...getInputProps()} />
            <div className={classes.overflow}>
                <ContentFolder title={"Elements"} icon={ElementIcon}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </ContentFolder>
                <ContentFolder title={"Fonts"} icon={FontIcon}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </ContentFolder>
                <ContentFolder title={"Particles"} icon={ParticleIcon}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </ContentFolder>
                <ContentFolder title={"Skeletons"} icon={SkeletonIcon}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </ContentFolder>
                <ContentFolder title={"Textures"} icon={TextureIcon}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </ContentFolder>
            </div>
            <Fade in={isDragActive}>
                <div className={classes.drag}>
                    Drop the files here ...
                </div>
            </Fade>
        </div>
    );
};

export default Library;
