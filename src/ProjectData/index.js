import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";
import store from "../store";
import projectTemplate from "./data/ProjectTemplate";
import {changeProgress} from "../ExportProjectDialog/action";
import {addTexture, removeTexture} from "../Library/action";

const EMPTY_ATLAS_ID = 0;

/**
 * @name TextureData
 * @typedef {Object}
 * @property {string} name
 * @property {number} id
 * @property {string} atlas
 * @property {string} format
 * @property {boolean} hasPreview
 */

/**
 * @name ProjectData
 * @typedef {Object}
 * @property {string} name
 * @property {Array.<TextureData>} textures
 */

export default {

    /**
     * @type {?ProjectData}
     * @private
     */

    _projectData: null,

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
     * @type {number}
     * @private
     */

    _guid: 0,

    /**
     * @type {?FileReader}
     * @private
     */

    _fileReader: null,

    /**
     * @type {Object.<number, string>}
     * @private
     */

    _textureSources: null,

    /**
     * @function
     * @public
     */

    init() {
        this._projectData =  {...projectTemplate};
        this._fileReader = new FileReader();
        this._textureSources = {};
    },

    /**
     * @function
     * @public
     * @param {string} name
     */

    rename(name) {
        this._projectData.name = name;
    },

    /**
     * @function
     * @public
     */

    export() {
        this._zip = new JSZip();

        const textures = this._projectData.textures;
        const textureCount = textures.length;
        let i, texture;
        const fileCount = textureCount + 1;
        let currentFileIndex = 1;
        const percentPerFile = 100 / (fileCount + 1);

        this._zip.file("meta.json", JSON.stringify(this._projectData));

        store.dispatch(changeProgress(percentPerFile * currentFileIndex, "meta.json"));

        for (i = 0; i < textureCount; ++i) {
            ++currentFileIndex;
            texture = textures[i];
            this._zip.file(`textures/${texture.name}.${texture.format}`, this._textureSources[texture.id].split(',')[1], {base64: true});
            store.dispatch(changeProgress(percentPerFile * currentFileIndex, `${texture.name}.${texture.format}`));
        }

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
        saveAs(this._zipData, `${this._projectData.name}.zip`);
    },

    /**
     * @function
     * @public
     */

    async import() {
        fileDialog({ multiple: false, accept: "application/zip" })
            .then(file =>
                    JSZip.loadAsync(file[0]).then(async (content) => {
                            const metaData = await this._extractFile(content, "meta.json");
                            this._projectData = JSON.parse(metaData);
                            const textures = this._projectData.textures;
                            const textureCount = textures.length;
                            let i, texture, source;

                            for (i = 0; i < textureCount; ++i) {
                                texture = textures[i];
                                source = `data:image/${texture.format};base64,` + (await this._extractFile(content, `textures/${texture.name}.${texture.format}`));
                                this._updateSource(texture, source)
                            }
                        }
                    )
            );
    },

    /**
     * @function
     * @async
     * @param {Array.<File>} files
     */

    async addFiles(files) {
        const fileCount = files.length;
        let i, file;

        for (i = 0; i < fileCount; ++i) {
            file = files[i];

            if (file.type.indexOf("image") !== -1) {
                await this._addTexture(file);
            }
        }
    },

    /**
     * @param {File} file
     * @return {Promise<void>}
     * @private
     */

    async _addTexture(file) {
        const nameSplit = file.name.split(".");
        nameSplit.pop();

        const name = nameSplit.join(".");
        const format = file.type.split("/")[1];
        const id = ++this._guid;
        const source = await this._readUploadedFileAsDataUrl(file);
        const fileData = {
            name,
            format,
            id,
            atlas: EMPTY_ATLAS_ID,
            hasPreview: true
        };
        this._projectData.textures.push(fileData);
        this._updateSource(fileData, source);
    },

    _extractFile(zip, path) {
        const pathSplit = path.split(".");
        const resolution = pathSplit[pathSplit.length - 1];
        const type = resolution === "png" || resolution === "jpeg" ? "base64" : "text";
        return new Promise((resolve, reject) => {
            zip.file(path).async(type).then(data => {
                resolve(data);
            }).catch(()=>
                reject(new DOMException("Problem parsing input file."))
            )
        });
    },

    /**
     * @function
     * @param {TextureData} texture
     * @param {string} source
     * @private
     */

    _updateSource(texture, source) {
        this._textureSources[texture.id] = source;
        store.dispatch(addTexture({...texture, source}));
    },

    /**
     * @function
     * @private
     * @param {File} file
     * @return {Promise<string>}
     * @private
     */

    _readUploadedFileAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            this._fileReader.onerror = () => {
                this._fileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            this._fileReader.onload = () => {
                resolve(this._fileReader.result);
            };
            this._fileReader.readAsDataURL(file);
        });
    },

    removeTexture(id) {
        const textures = this._projectData.textures;
        const textureCount = textures.length;
        let i, texture;

        for (i = 0; i < textureCount; ++i) {
            texture = textures[i];

            if (texture.id !== id) {
                continue;
            }
            textures.splice(i, 1);
            delete this._textureSources[id];
            store.dispatch(removeTexture(id));
            return;
        }
    }
}
