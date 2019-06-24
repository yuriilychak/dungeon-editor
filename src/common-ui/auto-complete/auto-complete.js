import React from "react";
import { string, func, bool, arrayOf, shape } from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";

import {makeStyles} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

import { InputField } from "./input-field";
import { SuggestionItem } from "./suggestion-item";

const useStyles = makeStyles({
    root: {
        margin: "5px 10px",
        width: "calc(100% - 20px)",
        flexGrow: 1,
        height: 250
    },
    autocompleteRoot: {
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
    },
    container: {
        width: "100%",
        flexGrow: 1,
        position: "relative"
    }
});

const AutoComplete = ({
                          label,
                          placeholder,
                          showEmpty,
                          suggestions,
                          clearDisabled,
                          addDisabled,
                          defaultItem,
                          onAddItem,
                          onSelectItem,
                          onClearItem
                      }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Downshift id="downshift-options">
                {({
                      clearSelection,
                      getInputProps,
                      getItemProps,
                      getLabelProps,
                      getMenuProps,
                      highlightedIndex,
                      inputValue,
                      isOpen,
                      openMenu,
                      selectedItem
                  }) => {
                    let popup = null;

                    if (isOpen) {
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

                        popup = (
                            <Paper className={classes.autocompleteRoot} square>
                                {suggestionList}
                            </Paper>
                        );
                    }

                    const {value} = getInputProps();

                    return (
                        <div className={classes.container}>
                            <InputField
                                label={label}
                                placeholder={placeholder}
                                clearSelection={clearSelection}
                                getInputProps={getInputProps}
                                getLabelProps={getLabelProps}
                                openMenu={openMenu}
                                selectedItem={selectedItem}
                                value={value}
                                clearDisabled={clearDisabled}
                                addDisabled={addDisabled}
                                onAddItem={onAddItem}
                                defaultItem={defaultItem}
                                onSelectItem={onSelectItem}
                                onClearItem={onClearItem}
                            />
                            <div {...getMenuProps()}>
                                {popup}
                            </div>
                        </div>
                    );
                }}
            </Downshift>
        </div>
    );
};

AutoComplete.defaultProps = {
    showEmpty: true,
    clearDisabled: false,
    addDisabled: false,
    defaultItem: ""
};

AutoComplete.propTypes = {
    label: string.isRequired,
    placeholder: string.isRequired,
    showEmpty: bool,
    suggestions: arrayOf(shape({ item: string })).isRequired,
    clearDisabled: bool,
    addDisabled: bool,
    defaultItem: string,
    onAddItem: func,
    onSelectItem: func.isRequired,
    onClearItem: func.isRequired
};

export default AutoComplete;
