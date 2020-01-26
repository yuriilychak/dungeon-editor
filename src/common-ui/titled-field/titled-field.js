import React from "react";
import classNames from "classnames";
import {string, number, oneOfType, node} from "prop-types";

import "./titled-field.css";

const TitledField = ({
                         title,
                         children,
                         titleWidth,
                         bodyClassName,
                         titleClassName,
                         className
                     }) => (
    <div className={classNames("titled-field-root", className)}>
        {title && (
            <div
                className={classNames("titled-field-title", titleClassName)}
                style={{
                    width: titleWidth
                }}
            >
                {`${title}:`}
            </div>
        )}
        < div className={classNames("titled-field-body", bodyClassName)}>
            {children}
        </div>
    </div>
);

TitledField.defaultProps = {
    titleWidth: "auto"
};

TitledField.propTypes = {
    title: string,
    children: node.isRequired,
    titleWidth: oneOfType([string, number]),
    className: string,
    bodyClassName: string,
    titleClassName: string
};

export default TitledField;
