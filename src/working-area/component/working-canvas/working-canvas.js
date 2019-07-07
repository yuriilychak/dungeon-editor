import React, { memo } from "react";
import { func } from "prop-types";

import "./working-canvas.css"

const WorkingCanvas  = ({onGetCanvasRef}) => (
    <canvas className="working-canvas-root" ref={onGetCanvasRef}/>
);

WorkingCanvas.propTypes = {
    onGetCanvasRef: func.isRequired
};

export default memo(WorkingCanvas);
