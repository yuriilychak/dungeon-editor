const ROOT_DIR_ID = -1;

export default class FileComponent {

    /**
     * @constructor
     * @param {string} rootName
     */

    constructor(rootName) {
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

        this._rootName = rootName;

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
     * PUBLIC METHODS
     * -----------------------------------------------------------------------------------------------------------------
     */

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
            await this.importElement(zip, this._files[i], this._generatePath(this._files[i]), progressCallback, errorCallback);
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
        projectData[this._rootName] = {
            files: this._files,
            fileGuid: this._fileGuid,
            directoryGuid: this._directoryGuid,
            directories: this._directories
        };
        this._files.forEach(info => {
            this.exportElement(zip, info, progressCallback, this._generatePath(info));
        });
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

    addDirectory(parentId = ROOT_DIR_ID) {
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

    refreshHierarchy(files, parentId = ROOT_DIR_ID) {
        let searchArray, id, element, isDirectory;

        files.forEach(file => {
            isDirectory = file.isDirectory;
            searchArray = isDirectory ? this._directories : this._files;
            id = file.id;
            element = searchArray.find(file => file.id === id);

            if (!element) {
                return;
            }

            element.parentId = parentId;

            if (!isDirectory) {
                return;
            }

            if (file.children && file.children.length !== 0) {
                this.refreshHierarchy(file.children, id);
                return;
            }

            file.expanded = false;
        });
    }

    /**
     * PROTECTED METHODS
     * -----------------------------------------------------------------------------------------------------------------
     */

    /**
     * @method
     * @protected
     * @param {FileData} value
     * @returns {boolean}
     */

    addFileInfo(value) {
        this._files.push(value);
        return true;
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
     * @method
     * @protected
     * @param {Array.<Object>} elements
     * @param {FILE_TYPE} fileType
     * @param {Array.<string>} formats
     * @returns {Array.<Object>}
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
     * @param {string} path
     */

    exportElement(zip, element, progressCallback, path) {}

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} file
     * @param {string} path
     * @param {Function} progressCallback
     * @param {Function} errorCallback
     */

    async importElement(zip, file, path, progressCallback, errorCallback) {}

    /**
     * @desc Generate base template for files.
     * @method
     * @protected
     * @param {string} name
     * @param {string} format
     * @param {boolean} [hasPreview = false]
     * @returns {FileData}
     */

    generateFileData(name, format, hasPreview = false) {
        return {
            name: name,
            format: format,
            parentId: ROOT_DIR_ID,
            id: ++this._fileGuid,
            hasPreview: hasPreview
        };
    }

    /**
     * @method
     * @protected
     * @param {string} path
     * @param {FileData} element
     * @returns {string}
     */

    joinPath(path, element) {
        return `${path}.${element.format}`;
    }

    /**
     * PRIVATE METHODS
     * -----------------------------------------------------------------------------------------------------------------
     */

    /**
     * @method
     * @param {Function} onGenerateDir
     * @param {number} [parentId = -1]
     * @private
     */

    _generateDirs(onGenerateDir, parentId = ROOT_DIR_ID) {
        const dirsToCreate = this._directories.filter(dir => dir.parentId === parentId);

        dirsToCreate.forEach(dir => {
            onGenerateDir(dir);
            this._generateDirs(onGenerateDir, dir.id);
        });
    }

    _generatePath(fileInfo) {
        const path = this._searchPath(fileInfo, []);
        path.unshift(this._rootName);
        return `/${path.join("/")}`;
    }

    /**
     *
     * @param {FileData} element
     * @param {string[]} path
     * @returns {string[]}
     * @private
     */

    _searchPath(element, path) {
        if (!element) {
            return path;
        }

        path.unshift(element.name);

        if (element.parentId === ROOT_DIR_ID) {
            return path;
        }

        element = this._directories.find(dir => dir.id === element.parentId);

        return this._searchPath(element, path);
    }

    /**
     * PROPERTIES
     * -----------------------------------------------------------------------------------------------------------------
     */

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

    get rootName() {
        return this._rootName;
    }
}
