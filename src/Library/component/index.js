import React, { useCallback } from 'react';
import Fade from '@material-ui/core/Fade';
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        margin: 0,
        position: "relative",
        boxShadow: "none",
        outline: "none"
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
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
    const classes = useStyles();

    return (
        <div {...getRootProps({
            onClick: event => event.stopPropagation()
        })} className={classes.root}>
            <input {...getInputProps()}/>
            Library
                <Fade in={isDragActive}>
                    <div className={classes.drag}>
                        Drop the files here ...
                    </div>
                </Fade>
        </div>
    );
};

export default Library;
