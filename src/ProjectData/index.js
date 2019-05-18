import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";
import store from "../store";
import {changeProgress} from "../ExportProjectDialog/action";
import {addTexture, addFont, removeTexture, removeFont, clearLibrary} from "../Library/action";
import FileUtil from "./FileUtil";
import TextureComponent from "./component/TextureComponent";
import FontComponent from "./component/FontComponent";

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
     * @type {TextureComponent}
     * @private
     */

    _textureComponent: new TextureComponent("textures"),

    /**
     * @type {FontComponent}
     * @private
     */

    _fontComponent: new FontComponent("fonts"),

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
        this._zip = new JSZip();

        const textureCount = this._textureComponent.fileCount;
        const fontCount = this._fontComponent.fileCount;
        const fileCount = textureCount + fontCount + 1;
        const percentPerFile = 100 / (fileCount + 1);
        let currentFileIndex = 0;
        let progress = 0;
        const progressCallback = path => {
            ++currentFileIndex;
            progress = percentPerFile * currentFileIndex;
            store.dispatch(changeProgress(progress, path));
        };

        FileUtil.packJson(
            this._zip,
            this._metaJsonConfig,
            {
                name: this._projectName,
                guid: this._guid,
                textures: this._textureComponent.info,
                fonts: this._fontComponent.info
            },
            progressCallback
        );

        this._textureComponent.export(this._zip, progressCallback);
        this._fontComponent.export(this._zip, progressCallback);

        store.dispatch(changeProgress(100));

        this._zip.generateAsync({ type: "blob" })
            .then(content => {
                this._zipData = content;
                store.dispatch(changeProgress(100, null, true));
            });
    },

    /**
     * @desc Clear zip
     * @function
     * @public
     */

    clearZipData() {
        this._zip = null;
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
        this._zip = null;
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
                        store.dispatch(clearLibrary());
                        const metaData = await FileUtil.extractFile(content, this._metaJsonConfig);
                        const projectData = JSON.parse(metaData);

                        this._guid = projectData.guid;
                        this._projectName = projectData.name;

                        await this._textureComponent.import(content, projectData.textures, this._addTextureHandler);
                        await this._fontComponent.import(content, projectData.fonts, this._addFontHandler);
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

        this._guid = this._fontComponent.add(fileElements, this._guid, this._addFontHandler);
        this._guid = this._textureComponent.add(fileElements, this._guid, this._addTextureHandler);
    },

    removeTexture(id) {
        if (!this._textureComponent.remove(id)) {
            return;
        }
        store.dispatch(removeTexture(id));
    },

    removeFont(id) {
        if (!this._fontComponent.remove(id)) {
            return;
        }
        store.dispatch(removeFont(id));
    },

    _addFontHandler(data) {
        store.dispatch(addFont(data));
    },

    _addTextureHandler(data) {
        store.dispatch(addTexture(data));
    }
}
