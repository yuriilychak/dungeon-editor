import reducer from '../reducer';
import types from '../state';
import { reducerTemplate } from "../../../test_templates";
import {UI_SECTION} from "../../enum";

describe('new-project-dialog reducer', () => {
    const { checkHandlerArray } = reducerTemplate(reducer, UI_SECTION.NEW_PROJECT_DIALOG);

    checkHandlerArray(
        types.CHANGE_ACTIVITY,
        [true, false],
        [
            { isPopupOpen: true },
            { isPopupOpen: false }
        ]
    );
});
