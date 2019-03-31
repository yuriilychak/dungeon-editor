import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    submitButton: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#f4385b",
        borderRadius: 0,
        borderBottom: "4px solid #801227",
        '&:active': {
            borderBottom: "none",
        },
        '&:hover': {
            backgroundColor: "#a52941",
        },
    },
    cancelButton: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#1d9cf9",
        borderRadius: 0,
        borderBottom: "4px solid #004995",
        '&:active': {
            borderBottom: "none",
        },
        '&:hover': {
            backgroundColor: "#0575c6",
        },
    },
    titleText: {
        color: theme.palette.primary.contrastText,
        fontSize: 26
    },
    contentText: {
        color: theme.palette.primary.contrastText
    },
    inputLabel: {
        color: "#ffffff",
        borderBottomColor: "#ffffff",
        '&$cssFocused': {
            color: "#1d9cf9",
        },
    },
});

const NewProjectDialog = props => {

    const { classes } = props;

    return (
        <Dialog
            open={props.isPopupOpen}
            onClose={props.onClosePopup}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" className={classes.titleText} disableTypography>New project</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.contentText}>
                    To create new project, please enter project name here.
                </DialogContentText>
                <TextField
                    InputLabel
                    margin="dense"
                    id="name"
                    label="Project name"
                    type="email"
                    fullWidth
                    InputProps={{
                        className: classes.inputLabel,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.onClosePopup} className={classes.submitButton}>
                    Cancel
                </Button>
                <Button color="primary" onClick={props.onSubmitProject} className={classes.cancelButton}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(withStyles(styles)(NewProjectDialog));
