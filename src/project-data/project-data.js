import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";

import store from "../store";
import {changeProgress} from "../export-project-dialog/action";
import * as LibraryActions from "../library/action";
import FileUtil from "./file-util";
import {
    FontComponent,
    ElementComponent,
    ParticleComponent,
    TextureComponent,
    SkeletonComponent
} from "./component";
import CONST from "./const";

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

    _projectName: CONST.DEFAULT_PROJECT_NAME,

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
     * @type {?{id: number, name: string}[]}
     */

    _atlases: null,

    _defaultAtlas: {
        id: CONST.DEFAULT_ATLAS_ID,
        name: CONST.DEFAULT_ATLAS_NAME
    },

    /**
     * @type {?{fileId: number, sectionId: number}}
     * @private
     */

    _selectData: null,

    /**
     * @type {number}
     * @private
     */

    _atlasId: 0,

    /**
     * @method
     * @public
     */

    init() {
        this._components = [
            new ElementComponent("elements", 0, false),
            new FontComponent("fonts", 1, true),
            new ParticleComponent("particles", 2, false),
            new SkeletonComponent("skeletons", 3, true),
            new TextureComponent("textures", 4, true)
        ];

        this._atlases = [ this._defaultAtlas ];
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
            name: this._projectName,
            atlases: this._atlases,
            atlasId: this._atlasId
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

                        this._atlases = projectData.atlases;

                        this._atlasId = projectData.atlasId;

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

    refreshHierarchy(files, sectionIndex, callback) {
        this._components[sectionIndex].refreshHierarchy(files);
        callback();
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
     * @returns {Object}
     */

    selectFile(sectionId, fileId, isDirectory) {
        const component = this._components[sectionId];
        const result = component.getFileInfo(fileId, isDirectory);

        if (component.isUseAtlases) {
            result.atlases = this._atlases;
        }

        this._selectData = { fileId, sectionId };

        return result;
    },

    /**
     * @public
     * @param {string} atlasName
     * @returns {boolean}
     */

    updateAtlas(atlasName) {
        let atlas = this._atlases.find(element => element.name === atlasName);

        if (!atlas) {
            atlas = {
                name: atlasName,
                id: ++this._atlasId
            };

            this._atlases.push(atlas)
        }

        if (!this._isDataSelected()) {
            return false;
        }

        const { sectionId, fileId } = this._selectData;


        return this._components[sectionId].updateAtlas(fileId, atlas.id);
    },

    getSelectedFile() {
        if (!this._isDataSelected()) {
            return false;
        }

        const { sectionId, fileId } = this._selectData;

        return this.selectFile(sectionId, fileId, false);
    },

    toggleCompressName() {
        if (!this._isDataSelected()) {
            return false;
        }

        const { sectionId, fileId } = this._selectData;
        const component = this._components[sectionId];

        return component.toggleCompressName(fileId);
    },

    switchFileValue(key) {
        if (!this._isDataSelected()) {
            return false;
        }

        const { sectionId, fileId } = this._selectData;
        const component = this._components[sectionId];

        return component.switchFileValue(fileId, key);
    },

    _isDataSelected() {
        return this._selectData !== null;
    }
};

export default ProjectData;
