import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";
import store from "../store";
import {changeProgress} from "../export-project-dialog/action";
import * as LibraryActions from "../library/action";
import FileUtil from "./FileUtil";
import FontComponent from "./component/FontComponent";
import ParticleComponent from "./component/ParticleComponent";
import TextureComponent from "./component/TextureComponent";
import ElementComponent from "./component/ElementComponent";
import SkeletonComponent from "./component/SkeletonComponent";

export default {
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
     * @type {Function[]}
     * @private
     */

    _addHandlers: null,

    /**
     * @type {Function[]}
     * @private
     */

    _dirHandlers: null,

    /**
     * @type {Function}
     * @private
     */

    _errorHandler: null,


    /**
     * @method
     * @public
     */

    init() {
        this._components = [
            new ElementComponent("elements"),
            new FontComponent("fonts"),
            new ParticleComponent("particles"),
            new SkeletonComponent("skeletons"),
            new TextureComponent("textures"),
        ];

        this._addHandlers = this._components.map((component, index) => (
            data => store.dispatch(LibraryActions.addFile(data, index))
        ));

        this._dirHandlers = this._components.map((component, index) => (
            dirData => store.dispatch(LibraryActions.addDirectory(index, dirData))
        ));

        this._errorHandler = error => {
            console.warn(`error when import: ${error}`);
        }
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
                                this._addHandlers[i],
                                this._dirHandlers[i],
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

        this._components.forEach((component, index) => {
            component.add(fileElements, this._addHandlers[index]);
        });
    },

    /**
     * @function
     * @public
     * @param {number} id
     * @param {number} sectionIndex
     * @param {boolean} isDirectory
     * @returns {boolean}
     */

    removeFile(id, sectionIndex, isDirectory) {
        const removedFiles = this._components[sectionIndex].remove(id, isDirectory);

        if (removedFiles.length === 0) {
            return false;
        }

        store.dispatch(LibraryActions.removeFile(id, sectionIndex));

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
     * @param {Object} [parent = null]
     */

    adDirectory(sectionIndex, parent = null) {
        let parentId = -1;

        if (parent !== null) {
            parentId = parent.node.id;
        }

        const dirData = this._components[sectionIndex].addDirectory(parentId);
        store.dispatch(LibraryActions.addDirectory(sectionIndex, dirData));
    }
}
