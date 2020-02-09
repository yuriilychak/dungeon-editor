import React, {memo} from "react";
import {func, bool} from "prop-types";
import classNames from "classnames";

import { ELEMENT_DROP_ID } from "../../../constant";

import "./working-canvas.scss"

const WorkingCanvas = ({onGetCanvasRef, hidden, onCreateElement}) => {
    const onDrop = event => {
        event.preventDefault();
        onCreateElement(
            parseInt(event.dataTransfer.getData(ELEMENT_DROP_ID), 10),
            event.clientX,
            event.clientY - 48
        );
    };

    return (
        <canvas
            id="WorkingCanvas"
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
    onCreateElement: func.isRequired,
    onGetCanvasRef: func.isRequired,
    hidden: bool
};

export default memo(WorkingCanvas);
