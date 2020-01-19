import React, {memo, useCallback} from "react";
import {string, number, func} from "prop-types";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import VerticalAlignCenterIcon from "@material-ui/icons/VerticalAlignCenter";

import {FIELD_TYPE} from "../../../../constants";
import {generateChangeEvent} from "../helpers";

const alignGroups = {
    "verticalAlign": [
        VerticalAlignTopIcon,
        VerticalAlignCenterIcon,
        VerticalAlignBottomIcon
    ],
    "horizontalAlign": [
        FormatAlignLeftIcon,
        FormatAlignCenterIcon,
        FormatAlignRightIcon
    ]
};

const ToggleGroupField = ({
                              id,
                              value,
                              onChange,
                              offset = 0,
                              format,
                              fromUserData
                          }) => {
    const currentValue = value - offset;
    const handleChange = useCallback((event, nextValue) => {
        if (nextValue !== currentValue && nextValue !== null) {
            onChange(generateChangeEvent(id, nextValue + offset, FIELD_TYPE.TOGGLE_GROUP, fromUserData, format));
        }
    }, [id, currentValue, offset, fromUserData, format, onChange]);

    return (
        <ToggleButtonGroup
            value={currentValue}
            exclusive
            onChange={handleChange}
            aria-label={id}
        >
            {alignGroups[id].map((Item, index) => {
                const itemId = `${id}_${index}`;
                return (
                    <ToggleButton
                        key={itemId}
                        value={index}
                        aria-label={itemId}
                    >
                        <Item/>
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
};

ToggleGroupField.propTypes = {
    id: string.isRequired,
    value: number.isRequired,
    onChange: func.isRequired,
    offset: number
};

export default memo(ToggleGroupField);
