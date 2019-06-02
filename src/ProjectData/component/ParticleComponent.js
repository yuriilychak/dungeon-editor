import FileComponent from "./FileComponent";
import FileUtil from "../FileUtil";
import FILE_TYPE from "../enum/FileType";
import FILE_FORMAT from "../enum/FileFormat";

export default class ParticleComponent extends FileComponent {
    constructor(fileDir) {
        super(fileDir);

        /**
         * @type {Object.<string, Object>}
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
     * @param {string} path
     */

    exportElement(zip, element, progressCallback, path) {
        const fileId = element.id;
        FileUtil.packJson(zip, this.joinPath(path, element), this._sources[fileId], progressCallback);
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} file
     * @param {string} path
     * @param {Function} progressCallback
     * @param {Function} errorCallback
     */

    async importElement(zip, file, path, progressCallback, errorCallback) {
        this._updateSource(file, await FileUtil.extractFile(zip, this.joinPath(path, file)), progressCallback);
    }

    /**
     * @desc Add elements to storage.
     * @method
     * @public
     * @param {Object[]} elements
     * @param {Function} progressCallback
     * @returns {number}
     */

    add(elements, progressCallback) {
        const jsons = this.filterFiles(elements, FILE_TYPE.TEXT, FILE_FORMAT.JSON);

        let data;


        jsons.forEach(json => {
            if (json.data.indexOf("maxParticles") === -1) {
                return;
            }

            data = this.generateFileData(json.name, json.format);

            this.addFileInfo(data);
            this.removeElement(elements, json);
            this._updateSource(data, json.data, progressCallback);
        });
    }

    clear() {
        super.clear();
        this._sources = {};
    }

    /**
     * @public
     * @param {number} id
     * @returns {Object | null}
     */

    remove(id) {
        const particle = super.remove(id);

        if (!particle) {
            return particle;
        }

        delete this._sources[id];

        return particle;
    }

    _updateSource(data, source, progressCallback) {
        this._sources[data.id] = JSON.parse(source);
        progressCallback(data);
    }
}
