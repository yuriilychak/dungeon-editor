import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";


const NewProjectDialog = props => {
    const emptyStr = "";
    const { t } = useTranslation();
    const { staticData, isPopupOpen } = props;
    const { locale, maxNameLength } = staticData;
    const contentTextId = "form-dialog-title";
    const buttonType = "contained";

    const [projectName, setProjectName] = useState(emptyStr);

    const onProjectNameChange = e => {
        const newName = e.target.value.match(/[\w]+/);
        const result = newName ? newName[0] : emptyStr;
        setProjectName(result);
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
                <TextField
                    label={t(locale.inputTitle)}
                    id="mui-theme-provider-standard-input"
                    autoComplete="off"
                    value={projectName}
                    fullWidth
                    onChange={onProjectNameChange}
                    inputProps={{
                        maxLength: maxNameLength
                    }}
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
