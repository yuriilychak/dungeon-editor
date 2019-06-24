import React from "react";
import {string, func, bool, arrayOf, shape} from "prop-types";
import Downshift from "downshift";

import {makeStyles} from "@material-ui/styles";

import {InputField} from "./input-field";
import {Select} from "./select";

const useStyles = makeStyles({
    root: {
        margin: "5px 10px",
        width: "calc(100% - 20px)",
        flexGrow: 1,
        height: 250
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
                  }) => (
                        <div className={classes.container}>
                            <InputField
                                label={label}
                                placeholder={placeholder}
                                clearSelection={clearSelection}
                                getInputProps={getInputProps}
                                getLabelProps={getLabelProps}
                                openMenu={openMenu}
                                selectedItem={selectedItem}
                                inputValue={inputValue}
                                clearDisabled={clearDisabled}
                                addDisabled={addDisabled}
                                onAddItem={onAddItem}
                                defaultItem={defaultItem}
                                onSelectItem={onSelectItem}
                                onClearItem={onClearItem}
                            />
                            <Select
                                showEmpty={showEmpty}
                                isOpen={isOpen}
                                inputValue={inputValue}
                                highlightedIndex={highlightedIndex}
                                selectedItem={selectedItem}
                                getItemProps={getItemProps}
                                getMenuProps={getMenuProps}
                                suggestions={suggestions}
                            />
                        </div>
                    )}
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
    suggestions: arrayOf(shape({item: string})).isRequired,
    clearDisabled: bool,
    addDisabled: bool,
    defaultItem: string,
    onAddItem: func,
    onSelectItem: func.isRequired,
    onClearItem: func.isRequired
};

export default AutoComplete;
