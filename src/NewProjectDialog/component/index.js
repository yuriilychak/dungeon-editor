import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import ProjectNameInput from "./ProjectNameInput";


const NewProjectDialog = props => {
    const emptyStr = "";
    const { t } = useTranslation();
    const { staticData, isPopupOpen } = props;
    const { locale, maxNameLength } = staticData;
    const contentTextId = "form-dialog-title";
    const buttonType = "contained";

    const [projectName, setProjectName] = useState(emptyStr);

    const onProjectNameChange = nextName => {
        setProjectName(nextName);
    };

    const onCancelNewProject = () => {
        setProjectName(emptyStr);
        props.onClosePopup();
    };

    const onSubmitNewProject = () => {
        setProjectName(emptyStr);
        props.onSubmitProject();
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
                <ProjectNameInput
                    titleLocale={t(locale.inputTitle)}
                    onChange={onProjectNameChange}
                    maxLength={maxNameLength}
                    defaultName={projectName}
                />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" variant={buttonType} onClick={onCancelNewProject}>
                    {t(locale.buttonCancel)}
                </Button>
                <Button color="primary" variant={buttonType} onClick={onSubmitNewProject}>
                    {t(locale.buttonSubmit)}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

NewProjectDialog.propTypes = {
    isPopupOpen: PropTypes.bool,
    staticData: PropTypes.shape({
        locale: PropTypes.shape({
            buttonCancel: PropTypes.string,
            buttonSubmit: PropTypes.string,
            contentTitle: PropTypes.string,
            contentText: PropTypes.string,
            inputTitle: PropTypes.string
        }),
        maxNameLength: PropTypes.number
    }),
    onClosePopup: PropTypes.func,
    onSubmitProject: PropTypes.func
};

export default React.memo(NewProjectDialog);
