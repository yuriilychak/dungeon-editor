import React from "react";
import classNames from "classnames";
import { string, number, object, oneOfType } from "prop-types";

import {addFormat} from "../../helpers";
import {FILE_FORMAT} from "../../enum";

import "./icon.scss";

const Icon = ({name, size = 16, className, style = {} }) => (
    <img
        src={addFormat(`${process.env.PUBLIC_URL}/static/icon/${name}`, FILE_FORMAT.SVG)}
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

Icon.propTypes = {
    name: string.isRequired,
    className: string,
    size: oneOfType([number, string]).isRequired,
    style: object
};

export default Icon;
