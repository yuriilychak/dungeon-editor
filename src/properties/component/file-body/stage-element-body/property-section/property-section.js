import React, {memo, useCallback} from "react";

import {PropertyField} from "../../common";
import PropertyRow from "../../common/property-row/property-row";
import {ExpansionPanel} from "../../../../../common-ui";

import "./property-section.scss";
import {PROPERTY_SECTION} from "../../../../constants";

export const PropertySection = ({
                                    id,
                                    expanded,
                                    data,
                                    locales,
                                    sectionTree,
                                    onChange,
                                    onExpansionChange
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

    const handleExpansionChange = useCallback((event, isExpanded) => onExpansionChange(isExpanded ? id : PROPERTY_SECTION.NONE), [id, onExpansionChange]);

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
        <ExpansionPanel
            id={id}
            icon={`properties/${id}`}
            expanded={expanded}
            onChange={handleExpansionChange}
            title={sectionLocale.title}
        >
            <div className="properties-stage-content">
                { rows }
            </div>
        </ExpansionPanel>
    );
};

export default memo(PropertySection);
