import React, {memo} from "react";
import classNames from "classnames";
import { bool, func, shape, string } from "prop-types";

import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    menuItem: {
        fontSize: 14,
        padding: 2,
        color: "#ffffff",
        height: 20,
        borderBottom: "solid 2px #595a5f"
    },
    menuItemSelected: {
        fontWeight: 500
    },
    menuItemDefault: {
        fontWeight: 400
    }
});


const SuggestionItem = memo(({suggestion, getItemProps, isHighlighted, isSelected}) => {
    const itemProps = getItemProps(suggestion);
    const classes = useStyles();

    return (
        <MenuItem
            {...itemProps}
            selected={isHighlighted}
            component="div"
            className={
                classNames(classes.menuItem,
                    {[classes.menuItemSelected]: isSelected},
                    {[classes.menuItemDefault]: !isSelected}
                )}
        >
            {suggestion.item}
        </MenuItem>
    );
});

SuggestionItem.propTypes = {
    isHighlighted: bool.isRequired,
    getItemProps: func.isRequired,
    isSelected: bool.isRequired,
    suggestion: shape({ label: string }).isRequired,
};

export default SuggestionItem;
