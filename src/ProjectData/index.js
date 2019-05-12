import JSZip from "jszip";
import fileDialog from "file-dialog";
import { saveAs } from "file-saver";
import store from "../store";
import projectTemplate from "./data/ProjectTemplate";
import {changeProgress} from "../ExportProjectDialog/action";
import {addTexture, addFont, removeTexture, removeFont, clearLibrary} from "../Library/action";

const EMPTY_ATLAS_ID = 0;

/**
 * @name FILE_TYPE
 * @enum {number}
 */

const FILE_TYPE = {
    NONE: 0,
    BINARY: 1,
    TEXT: 2
};

/**
 * @name FONT_TYPE
 * @enum {number}
 */

const FONT_TYPE = {
    NONE: 0,
    VECTOR: 1,
    BITMAP: 2,
    ATLAS: 3
};


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
 * @name FontData
 * @typedef {Object}
 * @property {string} name
 * @property {number} id
 * @property {number} type
 * @property {string} format
 * @property {boolean} hasPreview
 */

/**
 * @name ProjectData
 * @typedef {Object}
 * @property {string} name
 * @property {Array.<TextureData>} textures
 * @property {Array.<FontData>} fonts
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
     * @type {Object.<number, string>}
     * @private
     */

    _vectorFontSources: null,

    /**
     * @type {Object.<number, string>}
     * @private
     */

    _bitmapFontSources: null,

    /**
     * @type {Object.<number, string>}
     * @private
     */

    _bitmapFontTextures: null,

    /**
     * @type {Array.<string>}
     * @private
     */

    _vectorFontFormats: ["ttf", "otf", "woff"],

    /**
     * @type {Array.<string>}
     * @private
     */

    _bitmapFontFormats: ["fnt"],

    /**
     * @type {Array.<string>}
     * @private
     */

    _textureFormats: ["png", "jpeg", "jpg"],

    /**
     * @function
     * @public
     */

    init() {
        this._projectData =  {...projectTemplate};
        this._fileReader = new FileReader();
        this._textureSources = {};
        this._vectorFontSources = {};
        this._bitmapFontSources = {};
        this._bitmapFontTextures = {};
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

        const textureCount = this._projectData.textures.length;
        const fontCount = this._projectData.fonts.length;
        const fileCount = textureCount + fontCount + 1;
        let currentFileIndex = 1;
        const percentPerFile = 100 / (fileCount + 1);

        this._zip.file("meta.json", JSON.stringify(this._projectData));

        store.dispatch(changeProgress(percentPerFile * currentFileIndex, "meta.json"));

        this._projectData.textures.forEach(texture => {
            ++currentFileIndex;
            this._zip.file(`textures/${texture.name}.${texture.format}`, this._textureSources[texture.id].split(',')[1], {base64: true});
            store.dispatch(changeProgress(percentPerFile * currentFileIndex, `${texture.name}.${texture.format}`));
        });

        this._projectData.fonts.forEach( font => {
            ++currentFileIndex;

            if (font.type === FONT_TYPE.VECTOR) {
                this._zip.file(`fonts/${font.name}.${font.format}`, this._vectorFontSources[font.id].split(',')[1], {base64: true});
            }
            else {
                const texture = this._bitmapFontTextures[font.id];
                this._zip.file(`fonts/${font.name}.${font.format}`, JSON.stringify(this._bitmapFontSources[font.id]));
                this._zip.file(`fonts/${font.name}.${texture.format}`, texture.data.split(',')[1], {base64: true});
            }

            store.dispatch(changeProgress(percentPerFile * currentFileIndex, `${font.name}.${font.format}`));
        });

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
                    JSZip.loadAsync(file[0]).then(async content => {
                        store.dispatch(clearLibrary());
                        const metaData = await this._extractFile(content, "meta.json");
                        this._projectData = JSON.parse(metaData);
                        const textures = this._projectData.textures;
                        const textureCount = textures.length;
                        let i, texture, source;

                        for (i = 0; i < textureCount; ++i) {
                            texture = textures[i];
                            source = `data:image/${texture.format};base64,` + (await this._extractFile(content, `textures/${texture.name}.${texture.format}`));
                            this._updateTextureSource(texture, source)
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
        const fileCount = files.length;
        let i, file, fileType, fileData;
        const fileElements = [];

        for (i = 0; i < fileCount; ++i) {
            file = files[i];

            fileType = this._getFileType(file.name);

            if (fileType === FILE_TYPE.NONE) {
                continue;
            }

            fileData = await this._readUploadedFile(file, fileType);

            fileElements.push({
                ...this._splitFileName(file.name),
                type: fileType,
                data: fileData
            });
        }

        this._addFonts(fileElements);
        this._addTexture(fileElements);
    },

    _addFonts(elements) {
        const vectorFonts = this._filterFiles(elements, FILE_TYPE.BINARY, this._vectorFontFormats);
        const bitmapFonts = this._filterFiles(elements, FILE_TYPE.TEXT, this._bitmapFontFormats);

        let fontData;

        vectorFonts.forEach(font => {
            fontData = {
                name: font.name,
                format: font.format,
                id: ++this._guid,
                type: FONT_TYPE.VECTOR,
                hasPreview: false
            };

            this._projectData.fonts.push(fontData);

            this._removeElement(elements, font);
            this._updateVectorFontSource(fontData, font.data);
        });

        bitmapFonts.forEach(font => {
            const texture = elements.find(element =>
                element.name === font.name &&
                this._textureFormats.indexOf(element.format) !== -1
            );

            if (!texture) {
                console.warn(`Font ${font.name} doesn't have texture.`);
                this._removeElement(elements, font);
                return;
            }

            fontData = {
                name: font.name,
                format: font.format,
                id: ++this._guid,
                type: FONT_TYPE.BITMAP,
                hasPreview: false
            };

            this._projectData.fonts.push(fontData);

            this._removeElement(elements, font);
            this._removeElement(elements, texture);
            this._updateBitmapFontSource(fontData, font.data, texture.data, texture.format);
        });
    },

    /**
     * @param {Array.<Object>} elements
     * @return {Promise<void>}
     * @private
     */

    _addTexture(elements) {
        const textures = this._filterFiles(elements, FILE_TYPE.BINARY, this._textureFormats);

        textures.forEach(texture => {
            const fileData = {
                name: texture.name,
                format: texture.format,
                id: ++this._guid,
                atlas: EMPTY_ATLAS_ID,
                hasPreview: true
            };
            this._projectData.textures.push(fileData);
            this._updateTextureSource(fileData, texture.data);
            this._removeElement(elements, texture);
        });

    },

    _removeElement(elements, searchElement) {
        const spliceIndex = elements.findIndex(element => element === searchElement);

        if (spliceIndex === -1) {
            return false;
        }

        elements.splice(spliceIndex, 1);
        return true;
    },

    _splitFileName(fileName) {
        const nameSplit = fileName.split(".");
        return {
            format: nameSplit.pop(),
            name: nameSplit.join(".")
        }
    },

    /**
     * @param {Array.<Object>} elements
     * @param {FILE_TYPE} fileType
     * @param {Array.<string>} formats
     * @returns {Array.<Object>}
     * @private
     */

    _filterFiles(elements, fileType, formats) {
        return elements.filter(element =>
            element.type === fileType &&
            formats.indexOf(element.format) !== -1
        );
    },

    /**
     * @param {string} fileName
     * @returns {FILE_TYPE}
     * @private
     */

    _getFileType(fileName) {
        if ((/\.(ttf|otf|woff|png|jpeg|webp)$/i).test(fileName)) {
            return FILE_TYPE.BINARY;
        }
        else if ((/\.(json|atlas|fnt|txt|xml)$/i).test(fileName)) {
            return FILE_TYPE.TEXT;
        }

        return FILE_TYPE.NONE;
    },

    _extractFile(zip, path) {
        const pathSplit = path.split(".");
        const resolution = pathSplit[pathSplit.length - 1];
        const type = this._textureFormats.indexOf(resolution) !== -1 ? "base64" : "text";
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
     * @param {FontData} font
     * @param {string} sourceFont
     * @param {string} sourceTexture
     * @param {string} textureFormat
     * @private
     */

    _updateBitmapFontSource(font, sourceFont, sourceTexture, textureFormat) {
        let sourceObject = null;

        if ((/<[^>]+>|\\n+/g).test(sourceFont)) {
            console.log("xml");
            sourceObject = this._parseXmlData(sourceFont);
        }
        else if ((/^\s*{\s*[A-Z0-9._]+\s*:\s*[A-Z0-9._]+\s*(,\s*[A-Z0-9._]+\s*:\s*[A-Z0-9._]+\s*)*\}\s*$/i).test(sourceFont)) {
            sourceObject = JSON.parse(sourceFont);
        }
        else {
            sourceObject = this._parseTextData(sourceFont);
        }

        this._bitmapFontSources[font.id] = sourceObject;
        this._bitmapFontTextures[font.id] = {
            data: sourceTexture,
            format: textureFormat
        };
        store.dispatch(addFont(font));
    },

    _parseXmlData(data) {
        /**
         * @type {string[]}
         */
        const rows = data.split("\n");
        const result = {
            chars: [],
            kerning: []
        };

        rows.forEach(row => {
            const trimmedRow = row.trim().replace(/[<"/>]/g, "");
            this._parseRow(result, trimmedRow)
        });
        return result;
    },

    _parseTextData(data) {
        /**
         * @type {string[]}
         */
        const rows = data.split("\n");
        const result = {
            chars: [],
            kerning: []
        };
        rows.forEach(row => this._parseRow(result, row));

        return result;
    },

    _parseRow(result, row) {
        switch (true) {
            case row.startsWith("kerning "): {
                result.kerning.push(this._convertLineToJson(row));
                break;
            }
            case row.startsWith("info "):
            case row.startsWith("common "): {
                Object.assign(result, this._convertLineToJson(row));
                break;
            }
            case row.startsWith("char "): {
                result.chars.push(this._convertLineToJson(row));
                break;
            }
            default: {
                break;
            }
        }
    },

    _convertLineToJson(row) {
        let values = row.split(" ");
        let splitValue;
        values.shift();
        values = values.map( value => {
            splitValue = value.split("=");

            if (isNaN(splitValue[1])) {
                if (splitValue[1].indexOf(",") !== -1) {
                    splitValue[1] = `[${splitValue[1]}]`;
                }
                else {
                    splitValue[1] = `"${splitValue[1]}"`;
                }
            }
            else if (splitValue[1].length === 0) {
                splitValue[1] = "\"\"";
            }

            return `"${splitValue[0]}":${splitValue[1]}`;
        });
        const jsonString = `{ ${values.join(", ")} }`;
        return JSON.parse(jsonString);
    },

    /**
     * @function
     * @param {FontData} font
     * @param {string} sourceFont
     * @private
     */

    _updateVectorFontSource(font, sourceFont) {
        this._vectorFontSources[font.id] = sourceFont;
        store.dispatch(addFont(font));
    },

    /**
     * @function
     * @param {TextureData} texture
     * @param {string} source
     * @private
     */

    _updateTextureSource(texture, source) {
        this._textureSources[texture.id] = source;
        store.dispatch(addTexture({...texture, source}));
    },

    /**
     * @function
     * @private
     * @param {File} file
     * @param {FILE_TYPE} type
     * @return {Promise<string>}
     * @private
     */

    _readUploadedFile(file, type) {
        if (type === FILE_TYPE.NONE) {
            console.warn(`File ${file.name} corrupted`);
            return null;
        }

        return new Promise((resolve, reject) => {
            this._fileReader.onerror = () => {
                this._fileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            this._fileReader.onload = () => {
                resolve(this._fileReader.result);
            };

            if (type === FILE_TYPE.BINARY) {
                this._fileReader.readAsDataURL(file);
            }
            else {
                this._fileReader.readAsText(file);
            }
        });
    },

    removeTexture(id) {
        const textures = this._projectData.textures;
        const index = textures.findIndex(texture => texture.id === id);

        if (index === -1) {
            return;
        }

        textures.splice(index, 1);
        delete this._textureSources[id];
        store.dispatch(removeTexture(id));
    },

    removeFont(id) {
        const fonts = this._projectData.fonts;
        const index = fonts.findIndex(font => font.id === id);

        if (index === -1) {
            return;
        }

        const font = fonts[index];

        fonts.splice(index, 1);

        if (font.type === FONT_TYPE.BITMAP) {
            delete this._bitmapFontTextures[id];
            delete this._bitmapFontSources[id];
        }
        else {
            delete this._vectorFontSources[id];
        }

        store.dispatch(removeFont(id));
    }
}
