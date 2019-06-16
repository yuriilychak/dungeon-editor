import FileComponent from "./file-component";
import FileUtil from "../file-util";
import FILE_TYPE from "../enum/file-type";
import FILE_FORMAT from "../enum/file-format";

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
    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FontResourceData} font
     * @param {string} path
     * @param {Function} progressCallback
     * @param {Function} errorCallback
     */

    async importElement(zip, font, path, progressCallback, errorCallback) {
        if (font.type === FONT_TYPE.VECTOR) {
            this.updateSource(
                font,
                await FileUtil.extractVectorFont(zip, font, this.joinPath(path, font)),
                progressCallback
            );
        }
        else {
            const fontSource = await FileUtil.extractFile(zip, this.joinPath(path, font));
            const textureConfig = {name: font.name, format: font.textureFormat};
            const textureSource = await FileUtil.extractImage(zip, textureConfig, this.joinPath(path, textureConfig));
            this.updateSource(
                font,
                this._generateBMFontSource(font.name, fontSource, textureSource, font.textureFormat),
                progressCallback
            );
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
                ...this.generateFileData(font.name, font.format),
                type: FONT_TYPE.VECTOR,
                textureFormat: ""
            };

            this.addFileInfo(fontData);
            this.removeElement(elements, font);
            this.updateSource(fontData, font.data, progressCallback);
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
                ...this.generateFileData(font.name, font.format),
                type: FONT_TYPE.BITMAP,
                textureFormat: texture.format
            };

            this.addFileInfo(fontData);
            this.removeElement(elements, font);
            this.removeElement(elements, texture);
            this.updateSource(
                fontData,
                this._generateBMFontSource(fontData.name, font.data, texture.data, texture.format),
                progressCallback
            );
        });
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FontData} element
     * @param {Function} progressCallback
     * @param {string} path
     */

    exportElement(zip, element, progressCallback, path) {
        const fileId = element.id;

        if (element.type === FONT_TYPE.VECTOR) {
            FileUtil.packBinary(zip, this.joinPath(path, element), this.getSources(fileId), progressCallback);
        }
        else {
            const source = this.getSources(fileId);
            const texture = source.texture;
            FileUtil.packJson(zip, this.joinPath(path, element), source.data, progressCallback);
            FileUtil.packBinary(zip, this.joinPath(path, texture), texture.data, ()=>{});
        }
    }

    /**
     * @method
     * @param {string} name
     * @param {string} fontSource
     * @param {string} textureSource
     * @param {string} textureFormat
     * @returns {Object}
     * @private
     */

    _generateBMFontSource(name, fontSource, textureSource, textureFormat) {
        let data = null;

        const texture = {
            data: textureSource,
            name: name,
            format: textureFormat
        };

        try {
            data = JSON.parse(fontSource);
            return { data, texture };
        } catch (e) {
            data = (/<[^>]+>|\\n+/g).test(fontSource) ?
                this._parseXmlData(fontSource) :
                this._parseTextData(fontSource);
            return { data, texture };
        }
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
