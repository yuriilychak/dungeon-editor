import FileComponent from "./file-component";
import FileUtil from "../file-util";
import FILE_TYPE from "../enum/file-type";
import FILE_FORMAT from "../enum/file-format";

export default class TextureComponent extends FileComponent {
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
        FileUtil.packBinary(zip, this.joinPath(path, element), this.getSources(fileId), progressCallback);
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
        const  source = await FileUtil.extractImage(zip, file, this.joinPath(path, file));
        file.preview = source;
        this.updateSource(file, source, progressCallback);
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
        const textures = this.filterFiles(elements, FILE_TYPE.BINARY, FILE_FORMAT.TEXTURES);
        let fileData;

        textures.forEach(texture => {
            fileData = {
                ...this.generateFileData(texture.name, texture.format),
                preview: texture.data
            };
            this.addFileInfo(fileData);
            this.updateSource(fileData, texture.data, progressCallback);
            this.removeElement(elements, texture);
        });
    }

    /**
     * @method
     * @protected
     * @param {number} fileId
     * @param {FileData | DirectoryData} file
     * @return {Object}
     */

    generateFileSections(fileId, file) {
        return {
            atlas: file.atlas
        };
    }
}
