import React from "react";

import {Icon} from "../../../../../common-ui/icon";

import "./element-item.scss";

const ElementItem = ({
                         title,
                         icon
                     }) => {
    return (
        <div className="element-item-root" draggable >
            <div className="element-item-content">
                <Icon name={`element/${icon}`} size={42}/>
            </div>
            <div className="element-item-title">
                { title }
            </div>
        </div>
    );
};

export default ElementItem;
