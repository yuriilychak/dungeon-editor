import React from "react";
import {useTranslation} from "react-i18next";

import {Icon} from "../../../../../common-ui/icon";
import {ELEMENT_DROP_ID} from "../../../../../constant";

import "./element-item.scss";

const ElementItem = ({ title, id, icon }) => {
    const onDragStart = event => event.dataTransfer.setData(ELEMENT_DROP_ID, id);
    const { t } = useTranslation();
    return (
        <div className="element-item-root" draggable onDragStart={onDragStart}>
            <div className="element-item-content">
                <Icon name={`element/${icon}`} size={42}/>
            </div>
            <div className="element-item-title">
                {t(title)}
            </div>
        </div>
    );
};

export default ElementItem;
