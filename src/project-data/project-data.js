import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";
import store from "../store";
import {changeProgress} from "../export-project-dialog/action";
import * as LibraryActions from "../library/action";
import FileUtil from "./file-util";
import FontComponent from "./component/font-component";
import ParticleComponent from "./component/particle-component";
import TextureComponent from "./component/texture-component";
import ElementComponent from "./component/element-component";
import SkeletonComponent from "./component/skeleton-component";

const ProjectData = {
    /**
     * @type {?JSZip}
     * @private
     */

    _zip: null,

    /**
     * @type {?Blob}
     * @private
     */

    _zipData: null,

    /**
     * @type {?string}
     * @private
     */

    _projectName: "emptyProject",

    /**
     * @type {{name: string, format: string}}
     * @private
     */

    _metaJsonConfig: {
        name: "meta",
        format: "json"
    },

    /**
     * @type {FileComponent[]}
     * @private
     */

    _components: null,

    /**
     * @type {?RenameData}
     * @private
     */

    _renameData: null,

    /**
     * @method
     * @public
     */

    init() {
        this._components = [
            new ElementComponent("elements", 0),
            new FontComponent("fonts", 1),
            new ParticleComponent("particles", 2),
            new SkeletonComponent("skeletons", 3),
            new TextureComponent("textures", 4),
        ];
    },

    /**
     * @function
     * @public
     * @param {string} name
     */

    rename(name) {
        this._projectName = name;
    },

    /**
     * @function
     * @public
     */

    export() {
        const zip = new JSZip();
        const maxPercent = 100;
        let fileCount = 1;

        this._components.forEach(component => fileCount += component.fileCount);

        const percentPerFile = maxPercent / (fileCount + 1);
        let currentFileIndex = 0;
        let progress = 0;

        const progressCallback = path => {
            ++currentFileIndex;
            progress = percentPerFile * currentFileIndex;
            store.dispatch(changeProgress(progress, path));
        };
        const projectData = {
            name: this._projectName
        };

        this._components.forEach(component => component.export(projectData, zip, progressCallback));

        FileUtil.packJson(zip, `${this._metaJsonConfig.name}.${this._metaJsonConfig.format}`, projectData, progressCallback);

        store.dispatch(changeProgress(maxPercent));

        zip.generateAsync({ type: "blob" })
            .then(content => {
                this._zipData = content;
                store.dispatch(changeProgress(maxPercent, null, true));
            });
    },

    /**
     * @desc Clear zip
     * @function
     * @public
     */

    clearZipData() {
        this._zipData = null;
    },

    _addHandler(data, sectionId) {
        store.dispatch(LibraryActions.addFile(data, sectionId));
    },

    _dirHandler(dirData, sectionId) {
        store.dispatch(LibraryActions.addDirectory(sectionId, dirData));
    },

    _errorHandler(error) {
        console.warn(`error when import: ${error}`);
    },

    /**
     * @function
     * @public
     */

    save() {
        if (this._zipData === null) {
            return;
        }
        saveAs(this._zipData, `${this._projectName}.zip`);
    },

    /**
     * @function
     * @public
     */

    async import() {
        fileDialog({ multiple: false, accept: "application/zip" })
            .then(file =>
                    JSZip.loadAsync(file[0]).then(async content => {
                        store.dispatch(LibraryActions.clearLibrary());
                        const metaData = await FileUtil.extractFile(content,`${this._metaJsonConfig.name}.${this._metaJsonConfig.format}`);
                        /**
                         * @type {ProjectData}
                         */
                        const projectData = JSON.parse(metaData);

                        this._projectName = projectData.name;

                        const componentCount = this._components.length;
                        let i, component;

                        for (i = 0; i < componentCount; ++i) {
                            component = this._components[i];
                            await component.import(
                                content,
                                projectData[component.rootName],
                                this._addHandler,
                                this._dirHandler,
                                this._errorHandler
                            );
                        }
                    })
            );
    },

    addFiles() {
        fileDialog({ multiple: true })
            .then(async files => {
                await this.importFiles(Object.values(files));
            });
    },

    /**
     * @function
     * @async
     * @param {Array.<File>} files
     */

    async importFiles(files) {
        const fileElements = await FileUtil.readUploadedFiles(files);

        this._components.forEach(component => component.add(fileElements, this._addHandler));
    },

    /**
     * @function
     * @public
     * @param {number} id
     * @param {number} sectionIndex
     * @param {boolean} isDirectory
     * @param {Function} callback
     * @returns {boolean}
     */

    removeFile(id, sectionIndex, isDirectory, callback) {
        const removedFiles = this._components[sectionIndex].remove(id, isDirectory);

        if (removedFiles.length === 0) {
            return false;
        }

        callback();
        return true;
    },

    refreshHierarchy(files, sectionIndex) {
        this._components[sectionIndex].refreshHierarchy(files);
        store.dispatch(LibraryActions.updateTree(files, sectionIndex));
    },

    /**
     * @function
     * @public
     * @param {number} sectionIndex
     * @param {number} [parentId = -1]
     */

    addDirectory(sectionIndex, parentId = -1) {
        const dirData = this._components[sectionIndex].addDirectory(parentId);
        store.dispatch(LibraryActions.addDirectory(sectionIndex, dirData));
    },

    bindFileRename(id, sectionId) {
        this._renameData = { id, sectionId };
    },

    resetFileRename() {
        this._renameData = null;
    },

    /**
     * @function
     * @public
     * @param {string | null} newName
     * @param {Function} callback
     */

    renameFile(newName, callback) {
        if (this._renameData === null) {
            return;
        }

        const { sectionId, id } = this._renameData;

        this._components[sectionId].renameFile(id, newName);

        callback(id, sectionId, newName);
    },

    /**
     * @function
     * @public
     * @param {number} sectionId
     * @param {number} fileId
     * @param {boolean} isDirectory
     * @param {Function} callback
     */

    getFileInfo(sectionId, fileId, isDirectory, callback) {
        const result = this._components[sectionId].getFileInfo(fileId, isDirectory);
        callback(result);
    }
};

export default ProjectData;
