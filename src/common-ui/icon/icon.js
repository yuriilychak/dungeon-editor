import React from "react";
import { string } from "prop-types";

import "./icon.css";

const Icon = ({name}) => (
    <img src={`${process.env.PUBLIC_URL}/icon/${name}.svg`} className="icon-root" alt="empty Icon" draggable={false}/>
);

Icon.propTypes = {
    name: string.isRequired
};

export default Icon;
