import FileComponent from "./FileComponent";
import FileUtil from "../FileUtil";

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
     */

    exportElement(zip, element, progressCallback) {
        const fileId = element.id;
        FileUtil.packJson(zip, element, this._sources[fileId], progressCallback, this.fileDir);
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
        const source = JSON.parse(await FileUtil.extractFile(zip, file, this.fileDir));
        this._updateTextureSource(file, source, progressCallback);
    }
}
