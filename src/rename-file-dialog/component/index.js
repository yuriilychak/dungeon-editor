import React, { useState, memo } from 'react';
import { bool, shape, string, func, number } from 'prop-types';
import { useTranslation } from "react-i18next";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {NameInput} from "../../common-ui/name-input";

const RenameFileDialog = props => {
    const { t } = useTranslation();
    const { staticData, isPopupOpen } = props;
    const { locale, maxNameLength } = staticData;
    const contentTextId = "form-dialog-title";
    const buttonType = "contained";
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
        props.onSubmitRename(projectName);
    };

    return (
        <Dialog
            open={isPopupOpen}
            aria-labelledby={contentTextId}
        >
            <DialogTitle id={contentTextId}>
                {t(locale.contentTitle)}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t(locale.contentText)}
                </DialogContentText>
                <NameInput
                    isError={ isError }
                    ref={ ref => nameInputRef = ref }
                    titleLocale={ t(locale.inputTitle) }
                    errorLocale={t(locale.inputError)}
                    maxLength={ maxNameLength }
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    variant={buttonType}
                    onClick={onCancelNewProject}
                    id="newProjectDialog-cancel"
                >
                    {t(locale.buttonCancel)}
                </Button>
                <Button
                    color="primary"
                    variant={buttonType}
                    onClick={onSubmitNewProject}
                    id="newProjectDialog-submit"
                >
                    {t(locale.buttonSubmit)}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RenameFileDialog.propTypes = {
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

export default memo(RenameFileDialog);
