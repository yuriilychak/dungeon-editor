import FileComponent from "./FileComponent";
import FileUtil from "../FileUtil";
import FILE_TYPE from "../enum/FileType";
import FILE_FORMAT from "../enum/FileFormat";

const EMPTY_ATLAS_ID = 0;

export default class TextureComponent extends FileComponent {
    constructor(fileDir) {
        super(fileDir);

        /**
         * @type {Object.<string, string>}
         * @private
         */

        this._sources = {};
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} element
     * @param {Function} progressCallback
     */

    exportElement(zip, element, progressCallback) {
        const fileId = element.id;
        FileUtil.packBinary(zip, element, this._sources[fileId], progressCallback, this.fileDir);
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} file
     * @param {Function} progressCallback
     * @param {Function} errorCallback
     */

    async importElement(zip, file, progressCallback, errorCallback) {
        const  source = await FileUtil.extractImage(zip, file, this.fileDir);
        this._updateTextureSource(file, source, progressCallback);
    }

    clear() {
        super.clear();

        this._sources = {};
    }

    /**
     * @desc Add elements to storage. Return last generated guid.
     * @method
     * @public
     * @param {Object[]} elements
     * @param {number} guid
     * @param {Function} progressCallback
     * @returns {number}
     */

    add(elements, guid, progressCallback) {
        const textures = this.filterFiles(elements, FILE_TYPE.BINARY, FILE_FORMAT.TEXTURES);
        let fileData;

        textures.forEach(texture => {
            fileData = {
                name: texture.name,
                format: texture.format,
                id: ++guid,
                atlas: EMPTY_ATLAS_ID,
                hasPreview: true
            };
            this.addFileInfo(fileData);
            this._updateTextureSource(fileData, texture.data, progressCallback);
            this.removeElement(elements, texture);
        });
        return guid;
    }

    /**
     * @public
     * @param {number} id
     * @returns {Object | null}
     */

    remove(id) {
        const texture = super.remove(id);

        if (!texture) {
            return texture;
        }

        delete this._sources[id];

        return texture;
    }

    /**
     * @method
     * @private
     * @param {TextureData} texture
     * @param {string} source
     * @param {Function} progressCallback
     */

    _updateTextureSource(texture, source, progressCallback) {
        this._sources[texture.id] = source;
        progressCallback({...texture, source});
    }
}
