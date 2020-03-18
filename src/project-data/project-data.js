import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";

import FileUtil from "./file-util";
import {
    FontComponent,
    ElementComponent,
    ParticleComponent,
    SoundComponent,
    SkeletonComponent,
    TextureComponent,
    TileMapComponent
} from "./component";
import CONST from "./const";
import { FILE_FORMAT, SECTION_ID } from "../enum";
import EVENT from "./enum/event";

const { mCore } = window;
const { math, type, format } = mCore.util;

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
        format: FILE_FORMAT.JSON
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
            new ElementComponent("elements", SECTION_ID.ELEMENT, false),
            new FontComponent("fonts", SECTION_ID.FONT, true),
            new ParticleComponent("particles", SECTION_ID.PARTICLE, false),
            new SkeletonComponent("skeletons", SECTION_ID.SKELETON, true),
            new SoundComponent("sound", SECTION_ID.SOUND, false),
            new TextureComponent("textures", SECTION_ID.TEXTURE, true),
            new TileMapComponent("tile_map", SECTION_ID.TILE_MAP, false)
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
        let fileCount = 1;

        this._components.forEach(component => fileCount += component.fileCount);

        const percentPerFile = math.MAX_PERCENT / (fileCount + 1);
        let currentFileIndex = 0;
        let progress = 0;

        const progressCallback = path => {
            ++currentFileIndex;
            progress = math.round(percentPerFile * currentFileIndex);
            this._dispatchPercentChange(progress, path);
        };
        const projectData = {
            name: this._projectName,
            atlases: this._atlases,
            atlasId: this._atlasId
        };

        this._components.forEach(component => component.export(projectData, zip, progressCallback));

        FileUtil.packJson(
            zip,
            format.addFileType(this._metaJsonConfig.name, this._metaJsonConfig.format),
            projectData,
            progressCallback
        );

        this._dispatchPercentChange(math.MAX_PERCENT);

        zip.generateAsync({ type: "blob" })
            .then(content => {
                this._zipData = content;
                this._dispatchPercentChange(math.MAX_PERCENT, null, true);
            });
    },

    _addHandler(data, sectionId) {
        this._dispatch(EVENT.ADD_FILE, { sectionId, data });
    },

    _dirHandler(data, sectionId) {
        this._dispatch(EVENT.ADD_DIRECTORY, { sectionId, data });
    },

    _errorHandler(error) {
        console.warn(`error when import: ${error}`);
    },

    _isDataSelected() {
        return !type.isNull(this._selectData);
    },

    _dispatch(event, data) {
        mCore.eventDispatcher.dispatch(event, this, data);
    },

    _dispatchPercentChange(progress, fileName = null, isComplete = false) {
        this._dispatch(EVENT.CHANGE_PROGRESS, { progress, fileName, isComplete });
    },

    /**
     * @function
     * @public
     */

    save() {
        if (type.isNull(this._zipData)) {
            return;
        }
        saveAs(this._zipData, format.addFileType(this._projectName, FILE_FORMAT.ZIP));
    },

    /**
     * @function
     * @public
     */

    async import() {
        fileDialog({ multiple: false, accept: `application/${FILE_FORMAT.ZIP}` })
            .then(file =>
                JSZip.loadAsync(file[0]).then(async content => {
                    this._dispatch(EVENT.CLEAR_LIBRARY);
                    const metaData = await FileUtil.extractFile(
                        content,
                        format.addFileType(this._metaJsonConfig.name, this._metaJsonConfig.format)
                    );
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
                            this._addHandler.bind(this),
                            this._dirHandler.bind(this),
                            this._errorHandler.bind(this)
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

        this._components.forEach(component => component.add(fileElements, this._addHandler.bind(this)));
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

        callback(removedFiles);
        return true;
    },

    refreshHierarchy(files, sectionIndex, callback) {
        this._components[sectionIndex].refreshHierarchy(files);
        callback();
    },

    /**
     * @function
     * @public
     * @param {number} sectionId
     * @param {number} [parentId = -1]
     */

    addDirectory(sectionId, parentId = -1) {
        const data = this._components[sectionId].addDirectory(parentId);
        this._dispatch(EVENT.ADD_DIRECTORY, { sectionId, data });
    },

    bindFileRename(id, sectionId) {
        this._renameData = { id, sectionId };
    },

    isRenameBinded() {
        return !type.isNull(this._renameData);
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
        if (type.isNull(this._renameData)) {
            return;
        }

        const { sectionId, id } = this._renameData;

        this._components[sectionId].renameFile(id, newName);

        callback(id, sectionId, newName);
    },

    /**
     * @function
     * @param {number} sectionId
     * @param {string} fileName
     * @param {number} fileType
     */

    createFile(sectionId, fileName, fileType) {
        return this._components[sectionId].createFile(fileName, fileType);
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

            this._atlases.push(atlas);
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
    }
};

export default ProjectData;
