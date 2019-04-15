import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';

const ExportProjectDialog = props => {

    const contentTextId = "export-project-title";
    const { isPopupOpen, onClosePopup, progress } = props;

    return (
        <Dialog
            open={isPopupOpen}
            aria-labelledby={contentTextId}
        >
            <DialogTitle id={contentTextId}>
                Export project
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Wait until generate zip.
                </DialogContentText>
                <LinearProgress color="primary" variant="determinate" value={progress} />
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={ onClosePopup }
                    id="exportProjectDialog-cancel"
                >
                    Cancel
                </Button>
                <Button
                    disabled={ progress !== 100 }
                    color="primary"
                    variant="contained"
                    onClick={()=>{}}
                    id="exportProjectDialog-save"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ExportProjectDialog;
