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
        this._files = [];

        /**
         * @type {DirectoryData[]}
         * @private
         */

        this._directories = [];

        /**
         * @type {string}
         * @private
         */

        this._fileDir = fileDir;

        /**
         * @type {number}
         * @private
         */

        this._fileGuid = 0;

        /**
         * @type {number}
         * @private
         */

        this._directoryGuid = 0;
    }

    /**
     * @method
     * @public
     * @param {JSZip} zip
     * @param {SectionData} sectionData
     * @param {Function} progressCallback
     * @param {Function} dirCallback
     * @param {Function} errorCallback
     */

    async import(zip, sectionData, progressCallback, dirCallback, errorCallback) {
        this.clear();

        if (!sectionData) {
            return;
        }

        this._directories = sectionData.directories;
        this._directoryGuid = sectionData.directoryGuid;
        this._fileGuid = sectionData.fileGuid;
        this._files = sectionData.files;

        this._generateDirs(dirCallback);

        const fileCount = this._files.length;

        for (let i = 0; i < fileCount; ++i) {
            await this.importElement(zip, this._files[i], progressCallback, errorCallback);
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
        projectData[this._fileDir] = {
            files: this._files,
            fileGuid: this._fileGuid,
            directoryGuid: this._directoryGuid,
            directories: this._directories
        };
        this._files.forEach(info => this.exportElement(zip, info, progressCallback));
    }

    /**
     * @desc Clear sources and file information;
     * @method
     * @public
     */

    clear() {
        this._fileGuid = 0;
        this._directoryGuid = 0;
        this._files.length = 0;
        this._directories.length = 0;
    }

    /**
     * @desc Add elements to storage.
     * @method
     * @public
     * @param {Object[]} elements
     * @param {Function} progressCallback
     */

    add(elements, progressCallback) {}

    /**
     * @desc Add directory.
     * @method
     * @public
     * @param {number} [parentId = -1]
     * @returns {DirectoryData}
     */

    addDirectory(parentId = -1) {
        const id = ++this._directoryGuid;
        const dirData = {
            parentId,
            id,
            name: `empty_dir_${id}`
        };
        this._directories.push(dirData);
        return dirData;
    }

    /**
     * @param {FileData} value
     * @returns {boolean}
     */

    addFileInfo(value) {
        this._files.push(value);
        return true;
    }

    /**
     * @public
     * @param {number} id
     * @returns {Object | null}
     */

    remove(id) {
        const index = this._files.findIndex(element => element.id === id);

        if (index === -1) {
            return null;
        }

        const element = this._files[index];

        this._files.splice(index, 1);

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

    _generateDirs(onGenerateDir, parentId = -1) {
        const dirsToCreate = this._directories.filter(dir => dir.parentId === parentId);

        dirsToCreate.forEach(dir => {
            onGenerateDir(dir);
            this._generateDirs(onGenerateDir, dir.id);
        });
    }

    /**
     * @prtexted
     * @returns {number}
     */

    get fileGuid() {
        ++this._fileGuid;
        return this._fileGuid;
    }

    /**
     * @public
     * @returns {FileData[]}
     */

    get info() {
        return this._files;
    }

    /**
     * @public
     * @returns {number}
     */

    get fileCount() {
        return this._files.length;
    }

    /**
     * @public
     * @returns {string}
     */

    get fileDir() {
        return this._fileDir;
    }
}
