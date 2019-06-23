import React, { memo } from "react";
import Typography from "@material-ui/core/Typography";
import { string, element, arrayOf, oneOfType, number } from "prop-types";

import './titled-panel.css';

const TitledPanel = ({title, children, titleChildren, bodyPadding}) => (
    <div className="titled-panel-root">
        <div className="titled-panel-container">
            <Typography className="titled-panel-text" variant="button">
                {title}
            </Typography>
            {titleChildren}
        </div>
        <div
            className="titled-panel-body"
            style={{
                padding: bodyPadding
            }}
        >
            {children}
        </div>
    </div>
);

TitledPanel.defaultProps = {
    bodyPadding: 0
};

TitledPanel.propTypes = {
    title: string.isRequired,
    bodyPadding: number,
    children: oneOfType([arrayOf(element), element, string]).isRequired,
    titleChildren: oneOfType([arrayOf(element), element, string])
};

export default memo(TitledPanel);
