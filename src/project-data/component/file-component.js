const ROOT_DIR_ID = -1;

export default class FileComponent {

    /**
     * @constructor
     * @param {string} rootName
     * @param {number} sectionId
     */

    constructor(rootName, sectionId) {
        /**
         * @type {number}
         * @private
         */

        this._sectionId = sectionId;

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

        this._guid = 0;

        /**
         * @type {Object.<string, Object | string>}
         * @private
         */

        this._sources = {};
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
        this._guid = sectionData.guid;
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
            guid: this._guid,
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
        this._guid = 0;
        this._files.length = 0;
        this._directories.length = 0;
        this._sources = {};
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
        const id = ++this._guid;
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
     * @param {boolean} isDirectory
     * @returns {number[]}
     */

    remove(id, isDirectory) {
        const searchArray = isDirectory ? this._directories : this._files;
        const index = searchArray.findIndex(element => element.id === id);
        let result = [];

        if (index === -1) {
            return result;
        }

        const element = searchArray[index];

        searchArray.splice(index, 1);

        if (!isDirectory) {
            delete this._sources[element.id];
        }

        result.push(id);

        if (isDirectory) {
            const filesToRemove = this._files.filter(element => element.parentId === id);
            const dirsToRemove = this._directories.filter(element => element.parentId === id);

            filesToRemove.forEach(element => {
                result = result.concat(this.remove(element.id, false));
            });

            dirsToRemove.forEach(element => {
                result = result.concat(this.remove(element.id, true));
            });
        }

        return result;
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
     * @desc Rename file.
     * @method
     * @public
     * @param {number} id
     * @param {string} name
     * @returns {boolean}
     */

    renameFile(id, name) {
        let element =
            this._files.find(element => element.id === id) ||
            this._directories.find(element => element.id === id);

        if (!element) {
            return false;
        }

        element.name = name;

        return true;
    }

    /**
     * @desc Returns information about file for description area.
     * @public
     * @method
     * @param {number} fileId
     * @param {boolean} isDirectory
     * @returns {Object}
     */

    getFileInfo(fileId, isDirectory) {
        const searchArray = isDirectory ? this._directories : this._files;
        const element = searchArray.find(element => element.id === fileId);
        return {
            id: fileId,
            name: element.name,
            isDirectory,
            preview: element.preview,
            sectionId: this._sectionId,
            sections: this.generateFileSections(fileId, element)
        };
    }

    /**
     * PROTECTED METHODS
     * -----------------------------------------------------------------------------------------------------------------
     */

    /**
     * @method
     * @protected
     * @param {FileData} value
     */

    addFileInfo(value) {
        this._files.push(value);
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
     * @returns {FileData}
     */

    generateFileData(name, format) {
        return {
            name: name,
            format: format,
            parentId: ROOT_DIR_ID,
            id: ++this._guid,
            preview: null
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
     * @method
     * @protected
     * @param {FileData} data
     * @param {*} source
     * @param {Function} progressCallback
     */

    updateSource(data, source, progressCallback) {
        this._sources[data.id] = source;
        progressCallback(data, this._sectionId);
    }

    /**
     * @method
     * @protected
     * @param {number} id
     * @returns {Object | string | null}
     */

    getSources(id) {
        return this._sources[id] || null;
    }

    /**
     * @method
     * @protected
     * @param {number} fileId
     * @param {FileData | DirectoryData} file
     * @return {Object[]}
     */

    generateFileSections(fileId, file) {
        return [];
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
            onGenerateDir(dir, this._sectionId);
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
     * @return {number}
     */

    get sectionId() {
        return this._sectionId;
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

    get rootName() {
        return this._rootName;
    }
}
