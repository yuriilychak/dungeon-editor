import FileComponent from "./file-component";
import FileUtil from "../file-util";
import FILE_TYPE from "../enum/file-type";
import FILE_FORMAT from "../enum/file-format";

export default class ParticleComponent extends FileComponent {
    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} element
     * @param {Function} progressCallback
     * @param {string} path
     */

    exportElement(zip, element, progressCallback, path) {
        FileUtil.packJson(zip, this.joinPath(path, element), this.getSources(element.id), progressCallback);
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
            this.updateSource(data, json.data, progressCallback);
        });
    }

    updateSource(data, source, progressCallback) {
        super.updateSource(data, JSON.parse(source), progressCallback);
    }
}
