import React, {useCallback} from "react";
import Fade from "@material-ui/core/Fade";
import {useDropzone} from "react-dropzone";
import { func, string, element, arrayOf, oneOfType } from "prop-types";

import "./drop-area.css";

const DropArea = ({
                      children,
                      dropMessage,
                      onDropFiles
                  }) => {
    const onDrop = useCallback(onDropFiles, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });
    return (
        <div {...getRootProps({className: "dropzone"})} className="drop-area-root">
            <input {...getInputProps()} />
            <div className="drop-area-overflow">
                {children}
            </div>
            <Fade in={isDragActive}>
                <div className="drop-area-drag">
                    {dropMessage}
                </div>
            </Fade>
        </div>
    );
};

DropArea.propTypes = {
    children: oneOfType([element, arrayOf(element), string]),
    dropMessage: string.isRequired,
    onDropFiles: func.isRequired
};

export default DropArea;
