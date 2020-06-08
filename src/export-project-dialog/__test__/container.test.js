import { hideExportProjectDialog } from "../action";
import { checkContainer } from "../../../test_templates";

checkContainer(
    "export-project-dialog",
    [
        {
            methodKey: "onClosePopup",
            dispatcherData: [
                hideExportProjectDialog()
            ]
        },
        {
            methodKey: "onExportProject",
            dispatcherData: [
                hideExportProjectDialog()
            ]
        }
    ],
    true
);