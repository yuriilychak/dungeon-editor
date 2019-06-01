import FileComponent from "./FileComponent";
import FileUtil from "../FileUtil";
import FILE_TYPE from "../enum/FileType";
import FILE_FORMAT from "../enum/FileFormat";

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


export default class FontComponent extends FileComponent {
    constructor(fileDir) {
        super(fileDir);

        /**
         * @type {Object.<string, string>}
         * @private
         */

        this._vectorSources = {};

        /**
         * @type {Object.<string, string>}
         * @private
         */

        this._bitmapSources = {};

        /**
         * @type {Object.<number, BMFontTextureData>}
         * @private
         */

        this._bitmapTextures = {};
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FontResourceData} font
     * @param {Function} progressCallback
     * @param {Function} errorCallback
     */

    async importElement(zip, font, progressCallback, errorCallback) {
        if (font.type === FONT_TYPE.VECTOR) {
            const source = await FileUtil.extractVectorFont(zip, font, this.fileDir);
            this._updateVectorFontSource(font, source, progressCallback);
        }
        else {
            const fontSource = await FileUtil.extractFile(zip, font, this.fileDir);
            const textureSource = await FileUtil.extractImage(zip, {name: font.name, format: font.textureFormat}, this.fileDir);
            this._updateBitmapFontSource(font, fontSource, textureSource, font.textureFormat, progressCallback);
        }
    }

    /**
     * @desc Add elements to storage.
     * @method
     * @public
     * @param {Object[]} elements
     * @param {Function} progressCallback
     */

    add(elements, progressCallback) {
        const vectorFonts = this.filterFiles(elements, FILE_TYPE.BINARY, FILE_FORMAT.VECTOR_FONTS);
        const bitmapFonts = this.filterFiles(elements, FILE_TYPE.TEXT, FILE_FORMAT.BITMAP_FONTS);

        let fontData;

        vectorFonts.forEach(font => {
            fontData = {
                name: font.name,
                format: font.format,
                id: this.fileGuid,
                type: FONT_TYPE.VECTOR,
                hasPreview: false,
                textureFormat: ""
            };

            this.addFileInfo(fontData);
            this.removeElement(elements, font);
            this._updateVectorFontSource(fontData, font.data, progressCallback);
        });

        bitmapFonts.forEach(font => {
            const texture = elements.find(element =>
                element.name === font.name &&
                FILE_FORMAT.TEXTURES.indexOf(element.format) !== -1
            );

            if (!texture) {
                console.warn(`Font ${font.name} doesn't have texture.`);
                this.removeElement(elements, font);
                return;
            }

            fontData = {
                name: font.name,
                format: font.format,
                id: this.fileGuid,
                type: FONT_TYPE.BITMAP,
                hasPreview: false,
                textureFormat: texture.format
            };

            this.addFileInfo(fontData);
            this.removeElement(elements, font);
            this.removeElement(elements, texture);
            this._updateBitmapFontSource(fontData, font.data, texture.data, texture.format, progressCallback);
        });
    }

    /**
     * @desc Clear sources and file information;
     * @method
     * @public
     */

    clear() {
        super.clear();
        this._vectorSources = {};
        this._bitmapSources = {};
        this._bitmapTextures = {};
    }

    /**
     * @public
     * @param {number} id
     * @returns {Object | null}
     */

    remove(id) {
        const font = super.remove(id);

        if (!font) {
            return font;
        }

        if (font.type === FONT_TYPE.BITMAP) {
            delete this._bitmapTextures[id];
            delete this._bitmapSources[id];
        }
        else {
            delete this._vectorSources[id];
        }

        return font;
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FontData} element
     * @param {Function} progressCallback
     */

    exportElement(zip, element, progressCallback) {
        const fileId = element.id;

        if (element.type === FONT_TYPE.VECTOR) {
            FileUtil.packBinary(zip, element, this._vectorSources[fileId], progressCallback, this.fileDir);
        }
        else {
            const texture = this._bitmapTextures[fileId];
            FileUtil.packJson(zip, element, this._bitmapSources[fileId], progressCallback, this.fileDir);
            FileUtil.packBinary(zip, texture, texture.data, ()=>{}, this.fileDir);
        }
    }

    /**
     * @function
     * @param {FontData} font
     * @param {string} sourceFont
     * @param {Function} progressCallback
     * @private
     */

    _updateVectorFontSource(font, sourceFont, progressCallback) {
        this._vectorSources[font.id] = sourceFont;
        progressCallback(font);
    }

    /**
     * @function
     * @param {FontData} font
     * @param {string} sourceFont
     * @param {string} sourceTexture
     * @param {string} textureFormat
     * @param {Function} progressCallback
     * @private
     */

    _updateBitmapFontSource(font, sourceFont, sourceTexture, textureFormat, progressCallback) {
        let sourceObject = null;

        try {
            sourceObject = JSON.parse(sourceFont);
        } catch (e) {
            sourceObject = (/<[^>]+>|\\n+/g).test(sourceFont) ?
                this._parseXmlData(sourceFont) :
                this._parseTextData(sourceFont);
        }

        this._bitmapSources[font.id] = sourceObject;
        this._bitmapTextures[font.id] = {
            data: sourceTexture,
            name: font.name,
            format: textureFormat
        };
        progressCallback(font);
    }

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
    }

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
    }

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
    }

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
    }
}
