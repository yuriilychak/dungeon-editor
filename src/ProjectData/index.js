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
 * @property {string} source
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
     * @function
     * @public
     */

    init() {
        this._projectData =  {...projectTemplate};
        this._fileReader = new FileReader();
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

        store.dispatch(changeProgress(50, "meta.json"));

        this._zip.file("meta.json", JSON.stringify(this._projectData));

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

    import() {
        fileDialog({ multiple: false, accept: "application/zip" })
            .then(file =>
                    JSZip.loadAsync(file[0]).then(content =>
                        content.file("meta.json").async("text").then(data => {
                            this._projectData = JSON.parse(data);
                        })
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
        let i, file, fileData, name, nameSplit, format;

        for (i = 0; i < fileCount; ++i) {
            file = files[i];

            if (file.type.indexOf("image") !== -1) {
                nameSplit = file.name.split(".");
                nameSplit.pop();
                name = nameSplit.join(".");
                format = file.type.split("/")[1];
                fileData = {
                    name,
                    format,
                    id: ++this._guid,
                    atlas: EMPTY_ATLAS_ID,
                    hasPreview: true,
                    source: await this._readUploadedFileAsDataUrl(file)
                };

                this._projectData.textures.push(fileData);
                store.dispatch(addTexture(fileData));
            }
        }
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
            store.dispatch(removeTexture(id));
            return;
        }

    }
}
