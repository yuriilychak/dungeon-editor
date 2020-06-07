import { hideExportProjectDialog, showExportProjectDialog, changeProgress } from "../action";
import STATES from "../state";
import { checkAction } from "../../../test_templates";

describe("new-project-dialog actions", () => {
    const fullProgressPayload = {
        progress: 50,
        fileName: "text.json",
        isComplete: false
    };

    const percentOnlyData = { progress: 50 };
    const percentOnlyPayload = {
        progress: 50,
        fileName: null,
        isComplete: false
    };

    checkAction(hideExportProjectDialog(), STATES.CHANGE_ACTIVITY, false, "hideExportProjectDialog");
    checkAction(showExportProjectDialog(), STATES.CHANGE_ACTIVITY, true, "showExportProjectDialog");
    checkAction(changeProgress(fullProgressPayload), STATES.PROGRESS, fullProgressPayload, "pass full data");
    checkAction(changeProgress(percentOnlyData), STATES.PROGRESS, percentOnlyPayload, "pass percent only");
});
