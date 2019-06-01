import FileComponent from "./FileComponent";
import FILE_TYPE from "../enum/FileType";
import FILE_FORMAT from "../enum/FileFormat";
import FileUtil from "../FileUtil";

export default class SkeletonComponent extends FileComponent {
    constructor(fileDir) {
        super(fileDir);

        /**
         * @type {Object.<string, Object>}
         * @private
         */

        this._skeletonSources = {};

        /**
         * @type {Object.<string, string>}
         * @private
         */

        this._skeletonAtlases = {};

        /**
         * @type {Object.<string, string>}
         * @private
         */

        this._skeletonTextures = {};
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
        const skeletonSource = await FileUtil.extractFile(zip, file, this.fileDir);
        let atlas = null;
        let texture = null;

        if (file.hasAtlas) {
            atlas = {
                name: file.name,
                format: "atlas"
            };

            texture = {
                name: file.name,
                format: file.textureFormat
            };

            atlas.data = await FileUtil.extractFile(zip, atlas, this.fileDir);
            texture.data = await FileUtil.extractFile(zip, texture, this.fileDir, true);
        }

        this._updateSource(file, skeletonSource, atlas, texture, progressCallback);
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
        FileUtil.packJson(zip, element, this._skeletonSources[fileId], progressCallback, this.fileDir);
        if (element.hasAtlas) {
            const atlasData = this._skeletonAtlases[fileId];
            const textureData = this._skeletonTextures[fileId];
            const emptyCallback = () => {};

            FileUtil.packFile(zip, atlasData, atlasData.data, emptyCallback, this.fileDir);
            FileUtil.packBinary(zip, textureData, textureData.data, emptyCallback, this.fileDir);
        }
    }

    /**
     * @desc Clear sources and file information;
     * @method
     * @public
     */

    clear() {
        super.clear();
        this._skeletonSources = {};
        this._skeletonAtlases = {};
        this._skeletonTextures = {};
    }

    /**
     * @desc Add elements to storage.
     * @method
     * @public
     * @param {Object[]} elements
     * @param {Function} progressCallback
     */

    add(elements, progressCallback) {
        const jsons = this.filterFiles(elements, FILE_TYPE.TEXT, FILE_FORMAT.JSON);

        let data, texture, atlas, hasAtlas;

        jsons.forEach(json => {
            if (json.data.indexOf("\"bones\":") === -1) {
                return;
            }

            atlas = elements.find(element => element.name === json.name && element.format === "atlas");
            texture = elements.find(element =>
                element.name === json.name &&
                FILE_FORMAT.TEXTURES.indexOf(element.format) !== -1
            );

            hasAtlas = !!atlas && !!texture;

            if (!hasAtlas) {
                atlas = null;
                texture = null;
            }

            data = {
                name: json.name,
                format: json.format,
                id: this.fileGuid,
                hasPreview: false,
                hasAtlas: hasAtlas,
                textureFormat: hasAtlas ? texture.format : ""
            };

            this.addFileInfo(data);
            this.removeElement(elements, json);

            this.removeElement(elements, atlas);
            this.removeElement(elements, texture);

            this._updateSource(
                data,
                json.data,
                hasAtlas ? atlas: null,
                hasAtlas ? texture: null,
                progressCallback
            );
        });
    }

    /**
     * @public
     * @param {number} id
     * @returns {Object | null}
     */

    remove(id) {
        const element = super.remove(id);

        if (!element) {
            return element;
        }

        delete this._skeletonSources[id];
        delete this._skeletonAtlases[id];
        delete this._skeletonTextures[id];

        return element;
    }

    /**
     * @method
     * @private
     * @param {FileData} data
     * @param {string} skeletonSource
     * @param {string} atlasSource
     * @param {string} textureSource
     * @param {Function} progressCallback
     */

    _updateSource(data, skeletonSource, atlasSource, textureSource, progressCallback) {
        this._skeletonSources[data.id] = JSON.parse(skeletonSource);

        if (atlasSource && textureSource) {
            this._skeletonAtlases[data.id] = atlasSource;
            this._skeletonTextures[data.id] = textureSource;
        }

        progressCallback(data);
    }
}
