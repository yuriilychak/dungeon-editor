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

    async import(zip, files, progressCallback, errorCallback) {
        this.clear();
        this._fileInfo = files;
    }

    export(zip, progressCallback) {}

    /**
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

    add(elements, guid, progressCallback) {}

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
     * @protected
     * @returns {string}
     */

    get fileDir() {
        return this._fileDir;
    }
}
