import React from "react";
import classNames from "classnames";
import { string, number, object, oneOfType } from "prop-types";

import "./icon.scss";

const Icon = ({name, size, className, style = {} }) => (
    <img
        src={`${process.env.PUBLIC_URL}/static/icon/${name}.svg`}
        style={{
            ...style,
            width: size,
            height: size
        }}
        className={classNames("icon-root", className)}
        alt="empty Icon"
        draggable={false}
    />
);

Icon.defaultProps = {
    size: 16
};

Icon.propTypes = {
    name: string.isRequired,
    className: string,
    size: oneOfType([number, string]).isRequired,
    style: object
};

export default Icon;
