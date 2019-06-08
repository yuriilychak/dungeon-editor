import FileComponent from "./FileComponent";
import FileUtil from "../FileUtil";
import FILE_TYPE from "../enum/FileType";
import FILE_FORMAT from "../enum/FileFormat";

export default class ElementComponent extends FileComponent {
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
        FileUtil.packJson(zip, this.joinPath(path, element), this.getSources(fileId), progressCallback);
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
        this.updateSource(file, await FileUtil.extractFile(zip, this.joinPath(path, file)), progressCallback);
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

        let data;

        jsons.forEach(json => {
            if (json.data.indexOf("uiElements") === -1) {
                return;
            }

            data = this.generateFileData(json.name, json.format);

            this.addFileInfo(data);
            this.removeElement(elements, json);
            this.updateSource(data, json.data, progressCallback);
        });
    }

    updateSource(data, source, progressCallback) {
        super.updateSource(data, JSON.parse(source), progressCallback);
    }
}
