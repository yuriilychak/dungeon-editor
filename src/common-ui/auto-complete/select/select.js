import React from "react";
import deburr from "lodash/deburr";

import {makeStyles} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

import {SuggestionItem} from "./suggestion-item";
import {arrayOf, bool, func, shape, string, number} from "prop-types";

const useStyles = makeStyles({
    root: {
        position: "absolute",
        zIndex: 1,
        marginTop: 2,
        left: 0,
        right: 0,
        color: "#ffffff",
        backgroundColor: "#2a2b2f",
        height: 250,
        width: "100%",
        overflowX: "hidden",
        overflowY: "scroll"
    }
});

const Select = ({
                    showEmpty,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                    getItemProps,
                    getMenuProps,
                    suggestions
                }) => {
    const menuProps = getMenuProps();

    if (!isOpen) {
        return (
            <div {...menuProps}/>
        )
    }

    const targetValue = deburr(inputValue.trim()).toLowerCase();
    const inputLength = targetValue.length;
    const usedSuggestions = inputLength === 0 && !showEmpty ? [] : suggestions;
    const selectedLabel = selectedItem || "";

    const suggestionList = usedSuggestions.map((suggestion, index) => (
        <SuggestionItem
            key={index}
            isHighlighted={highlightedIndex === index}
            isSelected={selectedLabel.indexOf(suggestion.item) !== -1}
            suggestion={suggestion}
            getItemProps={getItemProps}
        />
    ));

    const classes = useStyles();

    return (
        <div {...menuProps}>
            <Paper className={classes.root} square>
                {suggestionList}
            </Paper>
        </div>
    );
};

Select.propTypes = {
    isOpen: bool.isRequired,
    showEmpty: bool.isRequired,
    suggestions: arrayOf(shape({item: string})).isRequired,
    inputValue: string.isRequired,
    highlightedIndex: number.isRequired,
    selectedItem: string,
    getItemProps: func.isRequired,
    getMenuProps: func.isRequired
};

export default Select;
