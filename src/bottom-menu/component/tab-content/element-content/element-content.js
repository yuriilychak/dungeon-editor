import React, { memo } from "react";
import {ElementItem} from "./element-item";

import "./element-content.scss";

const ElementContent = ({elements}) => {

    return (
        <div className="element-content-root">
            <div className="element-content-title">
                Components
            </div>
            <div className="element-content-elements-root">
                {
                    elements.map(element => (
                        <ElementItem {...element} key={element.id}/>
                    ))
                }
            </div>
        </div>
    )
};

export default memo(ElementContent);
