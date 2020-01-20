import React from "react";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {PropertyField} from "../common";
import PropertyRow from "../common/base/property-row/property-row";

import "./stage-element-body.scss";


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
            <ExpansionPanel key={id}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={id}
                    id={id}
                >
                    <span className="properties-section-title">
                        {sectionLocale.title}
                    </span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="properties-stage-content">
                        { rows }
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
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
