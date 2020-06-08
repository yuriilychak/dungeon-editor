import React from "react";
import { string, func, shape, number, bool } from "prop-types";
import { useTranslation } from "react-i18next";

import DialogContentText from "@material-ui/core/DialogContentText";
import LinearProgress from "@material-ui/core/LinearProgress";

import { ActionDialog } from "../../common-ui/action-dialog";

const ExportProjectDialog = props => {
    const { t } = useTranslation();
    const { isPopupOpen, onClosePopup, onExportProject, locale, progressData } = props;
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
        <ActionDialog
            open={isPopupOpen}
            dialogId="export-project"
            title={t(locale.contentTitle)}
            description={t(locale.contentText)}
            submitTitle={t(locale.buttonSave)}
            rejectTitle={t(locale.buttonCancel)}
            onSubmit={onExportProject}
            onReject={onClosePopup}
        >
            <DialogContentText>
                { progressText }
            </DialogContentText>
            <LinearProgress color="primary" variant="determinate" value={progress} />
        </ActionDialog>
    );
};

ExportProjectDialog.propTypes = {
    locale: shape({
        buttonCancel: string.isRequired,
        buttonSave: string.isRequired,
        contentText: string.isRequired,
        contentTitle: string.isRequired,
        exportBeginText: string.isRequired,
        exportCompleteText: string.isRequired,
        exportGenerateText: string.isRequired,
        exportProgressText: string.isRequired
    }).isRequired,
    onExportProject: func.isRequired,
    onClosePopup: func.isRequired,
    isPopupOpen: bool.isRequired,
    progressData: shape({
        progress: number.isRequired,
        fileName: string,
        isComplete: bool.isRequired
    })

};

export default ExportProjectDialog;
