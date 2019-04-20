import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
    button: {
        minWidth: 100
    },
    container: {
        minWidth: 400
    }
});

const ExportProjectDialog = props => {
    const { t } = useTranslation();
    const classes = useStyles();
    const contentTextId = "export-project-title";
    const { isPopupOpen, onClosePopup, onExportProject, staticData, progressData } = props;
    const { locale } = staticData;
    const buttonType = "contained";
    let progress = 0;

    let progressText = "";

    if (progressData !== null) {
        progress = progressData.progress;

        if (progress !== 100) {
            progressText = t(locale.exportProgressText).replace("{0}", progressData.fileName);

        }
        else {
            if (progressData.isComplete) {
                progressText = t(locale.exportCompleteText);
            }
            else {
                progressText = t(locale.exportGenerateText);
                progress = 99;
            }
        }
    }
    else {
        progressText = t(locale.exportBeginText);
    }

    return (
        <Dialog
            open={isPopupOpen}
            aria-labelledby={contentTextId}
            classes={{
                paper: classes.container
            }}
        >
            <DialogTitle id={contentTextId}>
                { t(locale.contentTitle) }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { t(locale.contentText) }
                </DialogContentText>
                <DialogContentText>
                        { progressText }
                </DialogContentText>
                <LinearProgress color="primary" variant="determinate" value={progress} />
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    variant={ buttonType }
                    className={ classes.button }
                    onClick={ onClosePopup }
                    id="exportProjectDialog-cancel"
                >
                    { t(locale.buttonCancel) }
                </Button>
                <Button
                    disabled={ progress !== 100 }
                    color="primary"
                    variant={ buttonType }
                    className={ classes.button }
                    onClick={ onExportProject }
                    id="exportProjectDialog-save"
                >
                    { t(locale.buttonSave) }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ExportProjectDialog.propTypes = {
    staticData: PropTypes.shape({
        locale: PropTypes.shape({
            buttonCancel: PropTypes.string.isRequired,
            buttonSave: PropTypes.string.isRequired,
            contentText: PropTypes.string.isRequired,
            contentTitle: PropTypes.string.isRequired,
            exportBeginText: PropTypes.string.isRequired,
            exportCompleteText: PropTypes.string.isRequired,
            exportGenerateText: PropTypes.string.isRequired,
            exportProgressText: PropTypes.string.isRequired
        })
    }).isRequired,
    onExportProject: PropTypes.func.isRequired,
    onClosePopup: PropTypes.func.isRequired,
    isPopupOpen: PropTypes.bool.isRequired,
    progressData: PropTypes.shape({
        progress: PropTypes.number.isRequired,
        fileName: PropTypes.string,
        isComplete: PropTypes.bool.isRequired
    })

};

export default ExportProjectDialog;
