export default class FileComponent {

    /**
     * @constructor
     * @param {string} fileDir
     */

    constructor(fileDir) {
        /**
         * @type {FileData[]}
         * @private
         */
        this._fileInfo = [];

        /**
         * @type {string}
         * @private
         */

        this._fileDir = fileDir;
    }

    /**
     * @method
     * @public
     * @param {JSZip} zip
     * @param {FileData[]} files
     * @param {Function} progressCallback
     * @param {Function} errorCallback
     */

    async import(zip, files, progressCallback, errorCallback) {
        this.clear();

        if (!files) {
            return;
        }

        this._fileInfo = files;

        const fileCount = this._fileInfo.length;

        for (let i = 0; i < fileCount; ++i) {
            await this.importElement(zip, this._fileInfo[i], progressCallback, errorCallback);
        }
    }

    /**
     * @method
     * @public
     * @param {Object} projectData
     * @param {JSZip} zip
     * @param {Function} progressCallback
     */

    export(projectData, zip, progressCallback) {
        projectData[this._fileDir] = this._fileInfo;
        this._fileInfo.forEach(info => this.exportElement(zip, info, progressCallback));
    }

    /**
     * @desc Clear sources and file information;
     * @method
     * @public
     */

    clear() {
        this._fileInfo.length = 0;
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
        return guid;
    }

    /**
     * @param {FileData} value
     * @returns {boolean}
     */

    addFileInfo(value) {
        this._fileInfo.push(value);
        return true;
    }

    /**
     * @public
     * @param {number} id
     * @returns {Object | null}
     */

    remove(id) {
        const index = this._fileInfo.findIndex(element => element.id === id);

        if (index === -1) {
            return null;
        }

        const element = this._fileInfo[index];

        this._fileInfo.splice(index, 1);

        return element;
    }

    /**
     * @method
     * @protected
     * @param {Object[]} elements
     * @param {Object} searchElement
     * @returns {boolean}
     */

    removeElement(elements, searchElement) {
        if (!searchElement) {
            return false;
        }

        const spliceIndex = elements.findIndex(element => element === searchElement);

        if (spliceIndex === -1) {
            return false;
        }

        elements.splice(spliceIndex, 1);
        return true;
    }

    /**
     * @param {Array.<Object>} elements
     * @param {FILE_TYPE} fileType
     * @param {Array.<string>} formats
     * @returns {Array.<Object>}
     * @protected
     */

    filterFiles(elements, fileType, formats) {
        return elements.filter(element =>
            element.type === fileType &&
            formats.indexOf(element.format) !== -1
        );
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} element
     * @param {Function} progressCallback
     */

    exportElement(zip, element, progressCallback) {}

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} file
     * @param {Function} progressCallback
     * @param {Function} errorCallback
     */

    async importElement(zip, file, progressCallback, errorCallback) {}

    /**
     * @public
     * @returns {FileData[]}
     */

    get info() {
        return this._fileInfo;
    }

    /**
     * @public
     * @returns {number}
     */

    get fileCount() {
        return this._fileInfo.length;
    }

    /**
     * @public
     * @returns {string}
     */

    get fileDir() {
        return this._fileDir;
    }
}
