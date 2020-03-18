import { connectStore } from "../helpers";
import { openTab,  closeTab, selectToggle } from './action';
import { TopMenu } from "./component";
import { showNewProjectDialog } from "../new-project-dialog/action";
import { showExportProjectDialog } from "../export-project-dialog/action";
import ProjectData from "../project-data/project-data";

import SUBSECTIONS from "./enum/subsection";
import { UI_SECTION } from "../enum";

export default connectStore(
    TopMenu,
    UI_SECTION.TOP_MENU,
    dispatch => ({
        onOpenTab: id => {
            dispatch(openTab(id));
        },
        onCloseTab: () => {
            dispatch(closeTab());
        },
        onSelectSection: id => {
            switch (id) {
            case SUBSECTIONS.NEW_PROJECT: {
                dispatch(showNewProjectDialog());
                dispatch(closeTab());
                break;
            }
            case SUBSECTIONS.EXPORT: {
                dispatch(showExportProjectDialog());
                ProjectData.export();
                dispatch(closeTab());
                break;
            }
            case SUBSECTIONS.OPEN_PROJECT: {
                ProjectData.import();
                dispatch(closeTab());
                break;
            }
            case SUBSECTIONS.QUIT: {
                window.close();
                break;
            }
            default: {
            }
            }
            dispatch(selectToggle(id));
            //dispatch(closeTab());
        }
    })
);
