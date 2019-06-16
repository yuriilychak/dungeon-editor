import React, {memo} from 'react';
import {bool, string, func, oneOfType, arrayOf, element} from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import "./action-dialog.css";

const ActionDialog = ({
                          open,
                          onSubmit,
                          onReject,
                          submitTitle,
                          rejectTitle,
                          title,
                          description,
                          dialogId,
                          children
                      }) => {
    const contentTextId = `${dialogId}-title`;
    const buttonType = "contained";

    return (
        <Dialog
            open={open}
            aria-labelledby={contentTextId}
            classes={{
                paper: "action-dialog-container"
            }}
        >
            <DialogTitle id={contentTextId}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    variant={buttonType}
                    onClick={onReject}
                    id={`${dialogId}-reject`}
                    className="action-dialog-button"
                >
                    {rejectTitle}
                </Button>
                <Button
                    color="primary"
                    variant={buttonType}
                    onClick={onSubmit}
                    id={`${dialogId}-submit`}
                    className="action-dialog-button"
                >
                    {submitTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ActionDialog.propTypes = {
    open: bool,
    onReject: func,
    onSubmit: func,
    title: string.isRequired,
    description: string.isRequired,
    submitTitle: string.isRequired,
    rejectTitle: string.isRequired,
    dialogId: string.isRequired,
    children: oneOfType([element, arrayOf(element), string])
};

export default memo(ActionDialog);
