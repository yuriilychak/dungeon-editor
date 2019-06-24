import React, {memo} from "react";
import {string, func, bool} from "prop-types";

import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";

import {ToolButton} from "../tool-button";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center"
    },
    inputRoot: {
        flexWrap: "wrap",
        width: "100%"
    },
    inputInput: {
        fontSize: 14,
        padding: 4,
        fontWeight: 500,
        width: "calc(100% - 40px)",
        flexGrow: 1
    }
});

const InputField = ({
                        label,
                        placeholder,
                        getLabelProps,
                        getInputProps,
                        clearSelection,
                        openMenu,
                        selectedItem,
                        addDisabled,
                        onAddItem,
                        clearDisabled,
                        defaultItem,
                        onSelectItem,
                        onClearItem
                    }) => {
    const clear = () => {
        clearSelection();
        onClearItem();
    };
    const {onBlur, onChange, onFocus, ...inputProps} = getInputProps({
        onChange: event => {
            if (event.target.value === "") {
                clear();
            }
        },
        onFocus: openMenu,
        placeholder,
    });

    let button = null;

    if (!inputProps.value && !selectedItem) {
        inputProps.value = defaultItem;
        selectedItem = defaultItem;
    }

    const {value} = inputProps;

    if (value !== "" && value !== selectedItem && !addDisabled) {
        button = <ToolButton onClick={() => onAddItem(value)} Icon={Add}/>
    } else if (selectedItem !== null && !clearDisabled && selectedItem !== defaultItem) {
        button = <ToolButton onClick={clear} Icon={Close}/>
    }

    if (value === selectedItem) {
        onSelectItem(selectedItem);
    }

    const classes = useStyles();
    const props = {
        InputProps: {
            onBlur,
            onChange,
            onFocus,
            classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
            },
            endAdornment: button
        },
        inputProps
    };

    return (
        <div className={classes.root}>
            <TextField
                label={label}
                InputLabelProps={getLabelProps({shrink: true})}
                {...props}
            />
        </div>
    );
};

InputField.propTypes = {
    label: string.isRequired,
    placeholder: string.isRequired,
    getLabelProps: func.isRequired,
    getInputProps: func.isRequired,
    clearSelection: func.isRequired,
    openMenu: func.isRequired,
    selectedItem: string,
    addDisabled: bool.isRequired,
    onAddItem: func,
    onSelectItem: func.isRequired,
    onClearItem: func.isRequired,
    clearDisabled: bool.isRequired,
    defaultItem: string.isRequired
};

export default memo(InputField);
