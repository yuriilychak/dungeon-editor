import React from "react";
import classNames from "classnames";
import {string, number, oneOfType, node} from "prop-types";

import "./titled-field.css";

const TitledField = ({
                         title,
                         children,
                         titleWidth,
                         className
                     }) => (
    <div className={classNames("titled-field-root", className)}>
        <span
            className="titled-field-title"
            style={{
                width: titleWidth
            }}
        >
            {`${title}:`}
        </span>
        <div className="titled-field-body">
            {children}
        </div>
    </div>
);

TitledField.defaultProps = {
    titleWidth: "auto"
};

TitledField.propTypes = {
    title: string.isRequired,
    children: node.isRequired,
    titleWidth: oneOfType([string, number]),
    className: string
};

export default TitledField;
