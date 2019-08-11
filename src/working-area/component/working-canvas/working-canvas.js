import React, {memo} from "react";
import {func, bool} from "prop-types";
import classNames from "classnames";

import "./working-canvas.css"

const WorkingCanvas = ({onGetCanvasRef, hidden}) => (
    <canvas
        className={classNames(
            "working-canvas-root",
            {"working-canvas-hidden": hidden}
        )}
        ref={onGetCanvasRef}
    />
);

WorkingCanvas.propTypes = {
    onGetCanvasRef: func.isRequired,
    hidden: bool
};

export default memo(WorkingCanvas);
