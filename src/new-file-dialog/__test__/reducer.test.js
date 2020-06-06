import reducer from '../reducer';
import types from '../state';
import { reducerTemplate } from "../../../test_templates";
import { UI_SECTION } from "../../enum";

describe("new-project-dialog reducer", () => {
    const { checkHandler } = reducerTemplate(reducer, UI_SECTION.NEW_FILE_DIALOG);

    checkHandler(
        types.OPEN_POPUP,
        0,
        {
            isPopupOpen: true,
            sectionId: 0,
            elementType: 2
        }
    );

    checkHandler(
        types.CLOSE_POPUP,
        false,
        {
            isPopupOpen: false
        }
    );
});
