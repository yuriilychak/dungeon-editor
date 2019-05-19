import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";
import store from "../store";
import {changeProgress} from "../ExportProjectDialog/action";
import * as LibraryActions from "../Library/action";
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
     * @type {number}
     * @private
     */

    _guid: 0,

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

        this._addHandlers = [
            data => store.dispatch(LibraryActions.addElement(data)),
            data => store.dispatch(LibraryActions.addFont(data)),
            data => store.dispatch(LibraryActions.addParticle(data)),
            data => store.dispatch(LibraryActions.addSkeleton(data)),
            data => store.dispatch(LibraryActions.addTexture(data))
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
            name: this._projectName,
            guid: this._guid
        };

        this._components.forEach(component => component.export(projectData, zip, progressCallback));

        FileUtil.packJson(zip, this._metaJsonConfig, projectData, progressCallback);

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
                        const metaData = await FileUtil.extractFile(content, this._metaJsonConfig);
                        /**
                         * @type {ProjectData}
                         */
                        const projectData = JSON.parse(metaData);

                        this._guid = projectData.guid;
                        this._projectName = projectData.name;

                        const componentCount = this._components.length;
                        let i, component;

                        for (i = 0; i < componentCount; ++i) {
                            component = this._components[i];
                            await component.import(content, projectData[component.fileDir], this._addHandlers[i]);
                        }
                    })
            );
    },

    /**
     * @function
     * @async
     * @param {Array.<File>} files
     */

    async addFiles(files) {
        const fileElements = await FileUtil.readUploadedFiles(files);

        this._components.forEach((component, index) => {
            this._guid = component.add(fileElements, this._guid, this._addHandlers[index]);
        });
    },

    removeElement(id) {
        this._removeFile(id, 0, LibraryActions.removeElement);
    },

    removeFont(id) {
        this._removeFile(id, 1, LibraryActions.removeFont);
    },

    removeParticle(id) {
        this._removeFile(id, 2, LibraryActions.removeParticle);
    },

    removeSkeleton(id) {
        this._removeFile(id, 3, LibraryActions.removeSkeleton);
    },

    removeTexture(id) {
        this._removeFile(id, 4, LibraryActions.removeTexture);
    },

    _removeFile(id, componentIndex, action) {
        if (!this._components[componentIndex].remove(id)) {
            return false;
        }
        store.dispatch(action(id));
        return true;
    }
}
