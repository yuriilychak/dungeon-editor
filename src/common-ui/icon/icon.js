import React from "react";
import { string, number } from "prop-types";

import "./icon.css";

const Icon = ({name, size}) => (
    <img
        src={`${process.env.PUBLIC_URL}/static/icon/${name}.svg`}
        style={{
            width: size,
            height: size
        }}
        className="icon-root"
        alt="empty Icon"
        draggable={false}
    />
);

Icon.defaultProps = {
    size: 16
};

Icon.propTypes = {
    name: string.isRequired,
    size: number
};

export default Icon;
