import {connectStore} from "../helpers";
import {Library} from "./component";
import {ProjectData} from "../project-data";
import {WorkingStage} from "../working-stage";
import {showExportProjectDialog} from "../export-project-dialog/action";
import {showRenameFileDialog} from "../rename-file-dialog/action";
import {showNewFileDialog} from "../new-file-dialog/action";
import {selectLibraryElement, deleteLibraryElement} from "../properties/action";
import {removeFile, changeSelectedSection } from "./action";
import * as LibraryActions from "./action";
import {SECTION_ID, UI_SECTION} from "../enum";
import {checkDelete} from "../working-area/action";
import {addTab} from "../working-area/action";
import {openElement} from "../bottom-menu/action";

const NEW_FILE_DIALOG_IDS = [SECTION_ID.ELEMENT, SECTION_ID.PARTICLE, SECTION_ID.TILE_MAP];

const ConLibrary = connectStore(
    Library,
    UI_SECTION.LIBRARY,
    dispatch => ({
        onRemoveFile: (sectionId, fileId, isDirectory) => {
            ProjectData.removeFile(fileId, sectionId, isDirectory, removedIds => {
                dispatch(removeFile(fileId, sectionId));
                dispatch(checkDelete(removedIds, sectionId));
                dispatch(deleteLibraryElement(removedIds, sectionId));
                WorkingStage.dispatchDelete(sectionId, removedIds);
            });
        },
        onAddFiles: () => {
            ProjectData.addFiles();
        },
        onDropFiles: files => {
            ProjectData.importFiles(files);
        },
        onUpdateTree: (files, sectionId) => {
            ProjectData.refreshHierarchy(files, sectionId, () => {
                dispatch(LibraryActions.updateTree(files, sectionId));
            });
        },
        onAddDirectory: (sectionId, fileId = -1) => {
            ProjectData.addDirectory(sectionId, fileId);
        },
        onRenameFile: (sectionId, fileId) => {
            ProjectData.bindFileRename(fileId, sectionId);
            dispatch(showRenameFileDialog());
        },
        onExportProject: () => {
            dispatch(showExportProjectDialog());
            ProjectData.export();
        },
        onAddFile: sectionId => {
            if (NEW_FILE_DIALOG_IDS.includes(sectionId)) {
                dispatch(showNewFileDialog(sectionId));
            } else {
                ProjectData.addFiles();
            }
        },
        onPublishProject: () => {
        },
        onSelectFile: (sectionId, fileId, isDirectory) => {
            WorkingStage.dispatchClearSelection();
            dispatch(selectLibraryElement(ProjectData.selectFile(sectionId, fileId, isDirectory)));
        },
        onOpenFile: (sectionId, fileId, isDirectory) => {
            if (isDirectory) {
                return;
            }

            const element = ProjectData.selectFile(sectionId, fileId, isDirectory);

            WorkingStage.showElement(sectionId, fileId);

            dispatch(addTab(element.name, fileId, sectionId));
            dispatch(openElement(fileId, sectionId));
        },
        onExpansionChange: selectedId => {
            dispatch(changeSelectedSection(selectedId));
        }
    })
);

export default ConLibrary;
