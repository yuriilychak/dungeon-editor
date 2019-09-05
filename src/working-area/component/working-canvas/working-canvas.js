import React, {memo} from "react";
import {func, bool} from "prop-types";
import classNames from "classnames";

import { ELEMENT_DROP_ID } from "../../../constant";

import "./working-canvas.css"

const WorkingCanvas = ({onGetCanvasRef, hidden}) => {
    const onDrop = event => {
        const data = event.dataTransfer.getData(ELEMENT_DROP_ID);
        console.log(event.clientX);
        console.log(event.clientY);
        console.log(data);
        event.preventDefault();
    };

    return (
        <canvas
            onDrop={onDrop}
            className={classNames(
                "working-canvas-root",
                {"working-canvas-hidden": hidden}
            )}
            ref={onGetCanvasRef}
        />
    );
};

WorkingCanvas.propTypes = {
    onGetCanvasRef: func.isRequired,
    hidden: bool
};

export default memo(WorkingCanvas);
