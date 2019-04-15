import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
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
    const { isPopupOpen, onClosePopup, progress, staticData } = props;
    const { locale } = staticData;
    const buttonType = "contained";

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
                    onClick={()=>{}}
                    id="exportProjectDialog-save"
                >
                    { t(locale.buttonSave) }
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ExportProjectDialog;
