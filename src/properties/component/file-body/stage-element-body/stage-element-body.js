import React from "react";

import {PropertyField} from "../common";
import {STAGE_ELEMENT_PROP} from "../../../../enum";

import "./stage-element-body.scss";

const StageElementBody = ({
                              isRoot,
                              locales,
                              data,
                              onChange
                          }) => {
    const generateElement = (id, children) => (
        <PropertyField
            id={id}
            locales={locales[id]}
            data={data[id]}
            onChange={onChange}
        >
            {children}
        </PropertyField>
    );

    let resultStructure = [];

    const transformStructure = [
        {id: STAGE_ELEMENT_PROP.POSITION},
        {id: STAGE_ELEMENT_PROP.SIZE},
        {id: STAGE_ELEMENT_PROP.SCALE},
        {id: STAGE_ELEMENT_PROP.SKEW},
        {id: STAGE_ELEMENT_PROP.ANCHOR},
        {id: STAGE_ELEMENT_PROP.ROTATION},
        {id: STAGE_ELEMENT_PROP.ALPHA},
        {
            id: STAGE_ELEMENT_PROP.TINT,
            children: [
                {id: STAGE_ELEMENT_PROP.VISIBLE},
                {id: STAGE_ELEMENT_PROP.INTERACTIVE}
            ]
        }
    ];

    resultStructure = resultStructure.concat(transformStructure);

    const textStructure = [
        {
            id: STAGE_ELEMENT_PROP.FONT_COLOR,
            children: [
                {id: STAGE_ELEMENT_PROP.FONT_SIZE}
            ]
        },
        {id: STAGE_ELEMENT_PROP.TEXT_ALIGN}
    ];

    if (data.isText) {
        resultStructure = resultStructure.concat(textStructure);
    }

    return (
        <div className="properties-stage-element-body-root">
            {resultStructure.map(element => {
                const children = element.children ? element.children.map(childElement => generateElement(childElement.id)) : null;
                return generateElement(element.id, children);
            })}
        </div>
    )
};


export default StageElementBody;
