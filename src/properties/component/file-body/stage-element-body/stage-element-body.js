import React, {Fragment} from "react";

import {PropertyField} from "../common";

import "./stage-element-body.scss";
import PropertyRow from "../common/base/property-row/property-row";

const StageElementBody = ({
                              isRoot,
                              locales,
                              data,
                              elementTrees,
                              onChange
                          }) => {
    const generateElement = (id, children) => (
        <PropertyField
            id={id}
            key={id}
            locales={locales[id]}
            data={data[id]}
            onChange={onChange}
        >
            {children}
        </PropertyField>
    );

    const generateSection = (trees, locales, id) => {
        const sectionTree = trees[id];
        const sectionLocale = locales[id];

        const rows = sectionTree.map(node => {
            const rowId = node.id;
            const content = node.content;

            const fields = content.map(element => {
                const children = element.children ? element.children.map(childElement => generateElement(childElement.id)) : null;
                return generateElement(element.id, children);
            });

            return (
                <PropertyRow key={rowId} label={sectionLocale[rowId]}>
                    {fields}
                </PropertyRow>
            )
        });

        return (
            <Fragment key={id}>
                { rows }
            </Fragment>
        );
    };


    let resultStructure = [
        generateSection(elementTrees, locales, "common")
    ];


    if (data.isText) {
        resultStructure.push(generateSection(elementTrees, locales, "text"));
    }

    return (
        <div className="properties-stage-element-body-root">
            {resultStructure}
        </div>
    )
};


export default StageElementBody;
