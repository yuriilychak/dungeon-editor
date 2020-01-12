import React, {memo, useCallback } from "react";
import { any, arrayOf, string, number, func } from "prop-types";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const ToggleGroupField = ({
    id,
    value,
    onChange,
    items
                          }) => {
    const handleChange = useCallback((event, nextValue) => {
        if (nextValue !== value && nextValue !== null) {
            onChange({ key: id, value: nextValue });
        }
    }, [id, value, onChange]);

    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleChange}
            aria-label={id}
        >
            {items.map((Item, index) => {
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
    items: arrayOf(any).isRequired
};

export default memo(ToggleGroupField);
