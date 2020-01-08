import React from "react";

import {CheckBox, PointField, SliderField, ColorField, NumberField} from "../common";
import {STAGE_ELEMENT_PROP} from "../../../../enum";

import "./stage-element-body.scss";

const StageElementBody = ({
                              isRoot,
                              locales,
                              data,
                              onChange
                          }) => {
    const generateElement = (id, children) => {
        const elementData = data[id];
        const elementLocale = locales[id];

        switch(elementData.type) {
            case "point":
                return (
                    <PointField
                        id={id}
                        key={id}
                        {...elementLocale}
                        {...elementData}
                        onChange={onChange}
                    >
                        {children}
                    </PointField>
                );
            case "color":
                return (
                    <ColorField
                        id={id}
                        key={id}
                        {...elementLocale}
                        {...elementData}
                        onChange={onChange}
                    >
                        {children}
                    </ColorField>
                );
            case "slider":
                return (
                    <SliderField
                        id={id}
                        key={id}
                        {...elementLocale}
                        {...elementData}
                        onChange={onChange}
                    >
                        {children}
                    </SliderField>
                );
            case "checkbox":
                return (
                    <CheckBox
                        id={id}
                        key={id}
                        {...elementLocale}
                        {...elementData}
                        onChange={onChange}
                    >
                        {children}
                    </CheckBox>
                );
            case "number": {
                return (
                    <NumberField
                        id={id}
                        key={id}
                        {...elementLocale}
                        {...elementData}
                        onChange={onChange}
                    >
                        {children}
                    </NumberField>
                );
            }
            default:
                return null;
        }
    };

    let resultStructure = [];

    const transformStructure = [
        { id: STAGE_ELEMENT_PROP.POSITION },
        { id: STAGE_ELEMENT_PROP.SIZE },
        { id: STAGE_ELEMENT_PROP.SCALE },
        { id: STAGE_ELEMENT_PROP.SKEW },
        { id: STAGE_ELEMENT_PROP.ANCHOR },
        { id: STAGE_ELEMENT_PROP.ROTATION },
        { id: STAGE_ELEMENT_PROP.ALPHA },
        {
            id: STAGE_ELEMENT_PROP.TINT,
            children: [
                { id: STAGE_ELEMENT_PROP.VISIBLE },
                { id: STAGE_ELEMENT_PROP.INTERACTIVE }
            ]
        }
    ];

    resultStructure = resultStructure.concat(transformStructure);

    const textStructure = [
        {
            id: STAGE_ELEMENT_PROP.FONT_COLOR,
            children: [
                { id: STAGE_ELEMENT_PROP.FONT_SIZE }
            ]
        }
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
