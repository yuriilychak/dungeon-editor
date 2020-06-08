import reducer from "../reducer";
import STATES from "../state";
import { reducerTemplate } from "../../../test_templates";
import { UI_SECTION } from "../../enum";

describe("export-project-dialog reducer", () => {
    const { checkHandlerArray } = reducerTemplate(reducer, UI_SECTION.EXPORT_PROJECT_DIALOG);

    const testType = (state, payloads, stateGenerator) =>
        checkHandlerArray(state, payloads, payloads.map(stateGenerator));

    testType(
        STATES.CHANGE_ACTIVITY,
        [true, false],
        isPopupOpen => ({ isPopupOpen })
    );

    testType(
        STATES.PROGRESS,
        [null, { progress: 50, fileName: "text.json", isComplete: false }],
        progressData => ({ progressData })
    );
});
