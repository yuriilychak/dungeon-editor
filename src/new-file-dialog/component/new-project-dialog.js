import React, {useState, memo} from 'react';
import {bool, func, string, number, shape} from 'prop-types';
import {useTranslation} from "react-i18next";

import {ActionDialog} from "../../common-ui/action-dialog";
import {NameInput} from "../../common-ui/name-input";

const NewFileDialog = ({
                           staticData,
                           isPopupOpen,
                           sectionId,
                           onSubmitPopup,
                           onClosePopup
                       }) => {
    const {t} = useTranslation();
    const {locale, maxNameLength, sectionLocale} = staticData;
    const [isError, setError] = useState(false);
    const sectionObject = { sectionName: t(sectionLocale[sectionId]) };

    let nameInputRef = React.createRef();

    const onCancelNewFile = () => {
        setError(false);
        onClosePopup();
    };

    const onSubmitNewFile = () => {
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
            dialogId={"new-project"}
            title={t(locale.contentTitle, sectionObject)}
            description={t(locale.contentText, sectionObject)}
            submitTitle={t(locale.buttonSubmit)}
            rejectTitle={t(locale.buttonCancel)}
            onReject={onCancelNewFile}
            onSubmit={onSubmitNewFile}
        >
            <NameInput
                isError={isError}
                ref={ref => nameInputRef = ref}
                titleLocale={t(locale.inputTitle, sectionObject)}
                errorLocale={t(locale.inputError)}
                maxLength={maxNameLength}
            />
        </ActionDialog>
    );
};

NewFileDialog.propTypes = {
    isPopupOpen: bool,
    staticData: shape({
        locale: shape({
            buttonCancel: string,
            buttonSubmit: string,
            contentTitle: string,
            contentText: string,
            inputError: string,
            inputTitle: string
        }),
        maxNameLength: number
    }),
    onClosePopup: func,
    onSubmitPopup: func
};

export default memo(NewFileDialog);
