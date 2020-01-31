import React, { memo } from "react";
import { string, element, arrayOf, oneOfType, number } from "prop-types";
import classNames from "classnames";

import Typography from "@material-ui/core/Typography";

import './titled-panel.scss';

const TitledPanel = ({title, children, titleChildren, bodyPadding, bodyClassName }) => (
    <div className="titled-panel-root">
        <div className="titled-panel-container">
            <Typography className="titled-panel-text" variant="button">
                {title}
            </Typography>
            {titleChildren}
        </div>
        <div
            className={classNames("titled-panel-body", bodyClassName)}
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
    bodyClassName: string,
    bodyPadding: oneOfType([number, string]),
    children: oneOfType([arrayOf(element), element, string]).isRequired,
    titleChildren: oneOfType([arrayOf(element), element, string])
};

export default memo(TitledPanel);
