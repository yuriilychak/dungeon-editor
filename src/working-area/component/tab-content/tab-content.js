import React from "react";

import Close from "@material-ui/icons/Close";

import { Icon } from "../../../common-ui/icon";

import "./tab-content.scss";

const TabContent = ({ title, icon, index, onClose, isDefault }) => {
    return (
        <div className="tab-content-root">
            <Icon name={icon} size={10}/>
            <span className="tab-content-title">
                {title}
            </span>
            {!isDefault && (
                <Close
                    onClick={event => {
                        event.stopPropagation();
                        onClose(index);
                    }}
                />
            )}

        </div>
    );
};

export default TabContent;
