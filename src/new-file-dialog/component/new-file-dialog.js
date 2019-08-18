import React, {useState, memo} from "react";
import {bool, func, string, number, shape, arrayOf} from "prop-types";
import {useTranslation} from "react-i18next";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import {ActionDialog} from "../../common-ui/action-dialog";
import {NameInput} from "../../common-ui/name-input";

const NewFileDialog = ({
                           staticData,
                           isPopupOpen,
                           elementType,
                           sectionId,
                           onChangeType,
                           onSubmitPopup,
                           onClosePopup
                       }) => {
    const {t} = useTranslation();
    const {locale, maxNameLength, sections} = staticData;
    const [isError, setError] = useState(false);
    const section = sections.find(element => element.id === sectionId);
    const sectionName = section ? t(section.locale) : "unknown";
    const selectName = "type";
    const selectId = `${selectName}-${sectionName}`;
    const sectionObject = {sectionName};
    const onChange = ({target}) => {
        onChangeType(target.value);
    };
    const typeSelect = section ? (
        <FormControl>
            <InputLabel htmlFor={selectId}>
                {t(locale.selectTitle, sectionObject)}
            </InputLabel>
            <Select
                value={elementType}
                onChange={onChange}
                inputProps={{
                    name: selectName,
                    id: selectId,
                }}
            >
                {
                    section.types.map(({id, locale}) => (
                        <MenuItem
                            value={id}
                            key={id}
                        >
                            {t(locale)}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    ) : null;

    let nameInputRef = React.createRef();

    const onReject = () => {
        setError(false);
        onClosePopup();
    };

    const onSubmit = () => {
        const projectName = nameInputRef.state.projectName;

        if (projectName === "") {
            setError(true);
            return;
        }

        setError(false);
        onSubmitPopup(projectName);
    };

    return (
        <ActionDialog
            open={isPopupOpen}
            dialogId={"new-file"}
            title={t(locale.contentTitle, sectionObject)}
            description={t(locale.contentText, sectionObject)}
            submitTitle={t(locale.buttonSubmit)}
            rejectTitle={t(locale.buttonCancel)}
            onReject={onReject}
            onSubmit={onSubmit}
        >
            <NameInput
                isError={isError}
                ref={ref => nameInputRef = ref}
                titleLocale={t(locale.inputTitle, sectionObject)}
                errorLocale={t(locale.inputError)}
                maxLength={maxNameLength}
            />
            {typeSelect}
        </ActionDialog>
    );
};

NewFileDialog.propTypes = {
    isPopupOpen: bool.isRequired,
    sectionId: number.isRequired,
    elementType: number.isRequired,
    staticData: shape({
        sections: arrayOf(shape({
            id: number.isRequired,
            locale: string.isRequired,
            types: arrayOf(shape({
                id: number.isRequired,
                locale: string.isRequired
            })).isRequired
        })).isRequired,
        locale: shape({
            buttonCancel: string.isRequired,
            buttonSubmit: string.isRequired,
            contentTitle: string.isRequired,
            contentText: string.isRequired,
            inputError: string.isRequired,
            inputTitle: string.isRequired,
            selectTitle: string.isRequired
        }),
        maxNameLength: number
    }),
    onChangeType: func,
    onClosePopup: func,
    onSubmitPopup: func
};

export default memo(NewFileDialog);
