import React, { memo } from "react";
import { string, node } from "prop-types";

import {TitledField} from "../../../../../../common-ui";

import "./property-row.scss";

const PropertyRow = ({
                         label,
                         children
                     }) => (
    <TitledField
        className="properties-property-row"
        title={label}
        titleWidth={42}
    >
        {children}
    </TitledField>
);


PropertyRow.propTypes = {
    label: string.isRequired,
    children: node.isRequired
};

export default memo(PropertyRow);
