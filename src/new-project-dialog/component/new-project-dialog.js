import React, { useState, memo } from 'react';
import { bool, func, string, number, shape } from 'prop-types';
import { useTranslation } from "react-i18next";

import {ActionDialog} from "../../common-ui/action-dialog";
import {NameInput} from "../../common-ui/name-input";

const NewProjectDialog = props => {
    const { t } = useTranslation();
    const { staticData, isPopupOpen } = props;
    const { locale, maxNameLength } = staticData;
    const [ isError, setError ] = useState(false);

    let nameInputRef = React.createRef();

    const onCancelNewProject = () => {
        setError(false);
        props.onClosePopup();
    };

    const onSubmitNewProject = () => {
        const projectName = nameInputRef.state.projectName;

        if (projectName === "") {
            setError(true);
            return;
        }

        setError(false);
        props.onSubmitProject(projectName);
    };

    return (
        <ActionDialog
            open={isPopupOpen}
            dialogId={"new-project"}
            title={t(locale.contentTitle)}
            description={t(locale.contentText)}
            submitTitle={t(locale.buttonSubmit)}
            rejectTitle={t(locale.buttonCancel)}
            onReject={onCancelNewProject}
            onSubmit={onSubmitNewProject}
        >
            <NameInput
                isError={ isError }
                ref={ ref => nameInputRef = ref }
                titleLocale={ t(locale.inputTitle) }
                errorLocale={t(locale.inputError)}
                maxLength={ maxNameLength }
            />
        </ActionDialog>
    );
};

NewProjectDialog.propTypes = {
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
    onSubmitProject: func
};

export default memo(NewProjectDialog);
