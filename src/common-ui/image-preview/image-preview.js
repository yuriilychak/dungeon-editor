import React from "react";
import { string, element, oneOfType, arrayOf, number } from "prop-types";

import Tooltip from '@material-ui/core/Tooltip';

const ImagePreview = ({
    preview,
    placement,
    children,
    height,
    width
}) => (
    <Tooltip title={
        <img
            src={preview}
            alt="empty Icon"
            style={{
                width,
                height
            }}
        />
    } placement="left">
        {children}
    </Tooltip>
);

ImagePreview.defaultProps = {
    width: "auto",
    height: "auto",
    placement: "left"
};

ImagePreview.propTypes = {
    preview: string.isRequired,
    placement: string,
    children: oneOfType([element, arrayOf(element)]).isRequired,
    height: oneOfType([string, number]),
    width: oneOfType([string, number])
};

export default ImagePreview;
