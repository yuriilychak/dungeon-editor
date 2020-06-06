import reducer from "../reducer";
import types from "../state";
import { reducerTemplate } from "../../../test_templates";
import {UI_SECTION} from "../../enum";

describe("rename-file-dialog reducer", () => {

    const { checkHandlerArray } = reducerTemplate(reducer, UI_SECTION.RENAME_FILE_DIALOG);

    checkHandlerArray(
        types.CHANGE_ACTIVITY,
        [true, false],
        [
            { isPopupOpen: true },
            { isPopupOpen: false }
        ]
    );
});
