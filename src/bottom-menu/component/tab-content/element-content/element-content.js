import React, { memo } from "react";
import {ElementItem} from "./element-item";

import "./element-content.scss";

const ElementContent = ({elements}) => {

    return (
        <div className="element-content-root">
            {
                elements.map(element => (
                    <ElementItem {...element} key={element.id}/>
                ))
            }
        </div>
    )
};

export default memo(ElementContent);
