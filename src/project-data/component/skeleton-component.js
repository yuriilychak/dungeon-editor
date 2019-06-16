import FileComponent from "./file-component";
import FILE_TYPE from "../enum/file-type";
import FILE_FORMAT from "../enum/file-format";
import FileUtil from "../file-util";

export default class SkeletonComponent extends FileComponent {
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
        const data = await FileUtil.extractFile(zip, this.joinPath(path, file));
        let atlas = null;
        let texture = null;

        if (file.hasAtlas) {
            atlas = {
                name: file.name,
                format: "atlas"
            };

            texture = {
                name: file.name,
                format: file.textureFormat
            };

            atlas.data = await FileUtil.extractFile(zip, this.joinPath(path, atlas));
            texture.data = await FileUtil.extractImage(zip, texture, this.joinPath(path, texture));
        }

        this.updateSource(file, { data, atlas, texture }, progressCallback);
    }

    /**
     * @method
     * @protected
     * @param {JSZip} zip
     * @param {FileData} element
     * @param {Function} progressCallback
     * @param {string} path
     */

    exportElement(zip, element, progressCallback, path) {
        const source = this.getSources(element.id);
        FileUtil.packJson(zip, this.joinPath(path, element), source.data, progressCallback);

        if (element.hasAtlas) {
            const emptyCallback = () => {};
            FileUtil.packFile(zip, this.joinPath(path, source.atlas), source.atlas.data, emptyCallback);
            FileUtil.packBinary(zip, this.joinPath(path, source.texture), source.texture.data, emptyCallback);
        }
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

        let data, texture, atlas, hasAtlas;

        jsons.forEach(json => {
            if (json.data.indexOf("\"bones\":") === -1) {
                return;
            }

            atlas = elements.find(element => element.name === json.name && element.format === "atlas");
            texture = elements.find(element =>
                element.name === json.name &&
                FILE_FORMAT.TEXTURES.indexOf(element.format) !== -1
            );

            hasAtlas = !!atlas && !!texture;

            if (!hasAtlas) {
                atlas = null;
                texture = null;
            }

            data = {
                ...this.generateFileData(json.name, json.format),
                hasAtlas: hasAtlas,
                textureFormat: hasAtlas ? texture.format : ""
            };

            this.addFileInfo(data);
            this.removeElement(elements, json);

            this.removeElement(elements, atlas);
            this.removeElement(elements, texture);

            this.updateSource(data, {data: json.data, atlas, texture}, progressCallback);
        });
    }
}
