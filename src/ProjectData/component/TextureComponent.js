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
     * @public
     * @param {JSZip} zip
     * @param {ProgressCallback} progressCallback
     */

    export(zip, progressCallback) {
        let fileId;
        this.info.forEach(texture => {
            fileId = texture.id;
            FileUtil.packBinary(zip, texture, this._sources[fileId], progressCallback, this.fileDir);
        });
    }

    async import(zip, files, progressCallback, errorCallback) {
        await super.import(zip, files, progressCallback, errorCallback);

        const textureCount = this.fileCount;
        let i, texture, source;

        for (i = 0; i < textureCount; ++i) {
            texture = this.info[i];
            source = await FileUtil.extractImage(zip, texture, this.fileDir);
            this._updateTextureSource(texture, source, progressCallback);
        }
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
