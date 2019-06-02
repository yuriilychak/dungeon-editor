import FILE_TYPE from "./enum/FileType";

/**
 * @desc Namespace that convert file from archive to raw and vice versa.
 * @namespace fileUtil
 */

export default {

    /**
     * @type {FileReader}
     * @private
     */

    _fileReader: new FileReader(),

    /**
     * @desc Extract image from archive.
     * @function
     * @member fileUtil
     * @param {JSZip} zip
     * @param {ResourceData} data
     * @param {string} path
     * @returns {Promise<string>}
     */

    async extractImage(zip, data, path) {
        return `data:image/${data.format};base64,${await this.extractFile(zip, path, true)}`;
    },

    /**
     * @desc Extract vector font from archive.
     * @function
     * @member fileUtil
     * @param {JSZip} zip
     * @param {ResourceData} data
     * @param {string} path
     * @returns {Promise<string>}
     */

    async extractVectorFont(zip, data, path) {
        return `data:application/x-font-${data.format};base64,${await this.extractFile(zip, path, true)}`;
    },

    /**
     * @desc Extract file from archive.
     * @function
     * @member fileUtil
     * @param {JSZip} zip
     * @param {string} path
     * @param {boolean} isBinary
     * @returns {Promise<string>}
     */

    extractFile(zip, path, isBinary = false) {
        const type = isBinary ? "base64" : "text";
        return new Promise((resolve, reject) => {
            zip.file(path).async(type).then(data => {
                resolve(data);
            }).catch(()=>
                reject(new DOMException("Problem parsing input file."))
            )
        });
    },

    /**
     * @desc Load uploaded file data.
     * @function
     * @member fileUtil
     * @param {File} file
     * @param {FILE_TYPE} type
     * @return {Promise<string>}
     * @private
     */

    _readUploadedFile(file, type) {
        if (type === FILE_TYPE.NONE) {
            console.warn(`File ${file.name} corrupted`);
            return null;
        }

        return new Promise((resolve, reject) => {
            this._fileReader.onerror = () => {
                this._fileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            this._fileReader.onload = () => {
                resolve(this._fileReader.result);
            };

            if (type === FILE_TYPE.BINARY) {
                this._fileReader.readAsDataURL(file);
            }
            else {
                this._fileReader.readAsText(file);
            }
        });
    },

    /**
     * @function
     * @member fileUtil
     * @param {File[]} files
     * @param files
     * @returns {FileData[]}
     */

    async readUploadedFiles(files) {
        const fileCount = files.length;
        let i, file, fileType, fileData;
        const result = [];

        for (i = 0; i < fileCount; ++i) {
            file = files[i];

            fileType = this._getFileType(file.name);

            if (fileType === FILE_TYPE.NONE) {
                continue;
            }

            fileData = await this._readUploadedFile(file, fileType);

            result.push({
                ...this._splitFileName(file.name),
                type: fileType,
                data: fileData
            });
        }

        return result;
    },

    _splitFileName(fileName) {
        const nameSplit = fileName.split(".");
        return {
            format: nameSplit.pop(),
            name: nameSplit.join(".")
        }
    },

    /**
     * @param {string} fileName
     * @returns {FILE_TYPE}
     * @private
     */

    _getFileType(fileName) {
        if ((/\.(ttf|otf|woff|png|jpeg|jpg|webp)$/i).test(fileName)) {
            return FILE_TYPE.BINARY;
        }
        else if ((/\.(json|atlas|fnt|txt|xml)$/i).test(fileName)) {
            return FILE_TYPE.TEXT;
        }

        return FILE_TYPE.NONE;
    },

    /**
     * @desc Pack binary to zip archive.
     * @function
     * @member fileUtil
     * @param {JSZip} zip
     * @param {string} path
     * @param {string} source
     * @param {ProgressCallback} progressCallback
     */

    packBinary(zip, path, source, progressCallback) {
        this.packFile(zip, path, source.split(',')[1], progressCallback, { base64: true });
    },

    /**
     * @desc Pack json to zip archive.
     * @function
     * @member fileUtil
     * @param {JSZip} zip
     * @param {string} path
     * @param {Object} source
     * @param {ProgressCallback} progressCallback
     */

    packJson(zip, path, source, progressCallback) {
        this.packFile(zip, path, JSON.stringify(source), progressCallback);
    },

    /**
     * @desc Pack file to zip archive.
     * @function
     * @member fileUtil
     * @param {JSZip} zip
     * @param {string} path
     * @param {string} source
     * @param {ProgressCallback} progressCallback
     * @param {?Object} [options = undefined]
     */

    packFile(zip, path, source, progressCallback, options = undefined) {
        console.log(path, source);
        zip.file(path, source, options);
        progressCallback(path);
    },

    /**
     * @desc Generate file path.
     * @function
     * @member fileUtil
     * @param {ResourceData} data
     * @param {?string} directory
     * @returns {string}
     * @private
     */

    _getPath(data, directory) {
        return directory !== null ? `${directory}/${data.name}.${data.format}` : `${data.name}.${data.format}`;
    }
};
