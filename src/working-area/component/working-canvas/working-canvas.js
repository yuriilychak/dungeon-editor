import React, { memo } from "react";
import { func } from "prop-types";

import { createMount } from '@material-ui/core/test-utils';

import "./working-canvas.css"

const WorkingCanvas  = ({onGetCanvasRef}) => (
    <canvas className="working-canvas-root" ref={onGetCanvasRef}/>
);

WorkingCanvas.propTypes = {
    onGetCanvasRef: func.isRequired
};

export default memo(WorkingCanvas);
