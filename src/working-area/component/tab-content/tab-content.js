import React from "react";

import Close from "@material-ui/icons/Close";

import {Icon} from "../../../common-ui/icon";

import "./tab-content.css"

const TabContent = ({title, icon, index, onClose}) => {
    return (
        <div className="tab-content-root">
            <Icon name={icon} size={10}/>
            <span className="tab-content-title">
                {title}
            </span>
            <Close
                onClick={event => {
                    event.stopPropagation();
                    onClose(index);
                }}
            />
        </div>
    );
};

export default TabContent;
