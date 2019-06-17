import React from "react";
import classNames from "classnames";
import { string, element, arrayOf, number, oneOfType } from "prop-types";

import "./titled-field.css";

const TitledField = ({
                         title,
                         children,
                         titleWidth,
                         className,
                     }) => {
    const classes = classNames(
        "titled-field-root",
        {[className]: !!className}
    );
    return (
        <div className={classes}>
            <div
                className="titled-field-title"
                style={{
                    width: titleWidth
                }}
            >
                {`${title}:`}
            </div>
            <div className="titled-field-body">
                {children}
            </div>
        </div>
    )
};

TitledField.defaultProps = {
    titleWidth: "auto"
};

TitledField.propTypes = {
    title: string.isRequired,
    children: oneOfType([element, arrayOf(element), string, number]).isRequired,
    titleWidth: oneOfType([string, number]),
    className: string
};

export default TitledField;
