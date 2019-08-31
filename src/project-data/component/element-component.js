import FileComponent from "./file-component";
import FileUtil from "../file-util";
import FILE_TYPE from "../enum/file-type";
import FILE_FORMAT from "../enum/file-format";
import ELEMENT_WIDTH from "../enum/element-width";
import ELEMENT_HEIGHT from "../enum/element-height";
import CONSTANT from "../const";

export default class ElementComponent extends FileComponent {
    /**
     * PUBLIC METHODS
     * -----------------------------------------------------------------------------------------------------------------
     */

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

    /**
     * PROTECTED METHODS
     * -----------------------------------------------------------------------------------------------------------------
     */

    /**
     * @method
     * @protected
     * @param {FileData} data
     * @param {*} source
     * @param {Function} progressCallback
     */

    updateSource(data, source, progressCallback) {
        super.updateSource(data, JSON.parse(source), progressCallback);
    }

    /**
     * @desc Generate default sources when create element
     * @method
     * @protected
     * @param {number} type
     */

    createSources(type) {
        const { UI_ELEMENT } = window.mCore.enumerator.ui;
        const commonProps = {
            name: "Root",
            children: [],
            animations: [],
            anchor: [0, 0]
        };

        switch (type) {
            case UI_ELEMENT.ATLAS_LABEL:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.SMALL,
                    height: ELEMENT_HEIGHT.MEDIUM,
                    fontSize: CONSTANT.DEFAULT_FONT_SIZE
                };
            case UI_ELEMENT.BUTTON:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.SMALL,
                    height: ELEMENT_HEIGHT.MEDIUM
                };
            case UI_ELEMENT.CHECK_BOX:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MICRO,
                    height: ELEMENT_HEIGHT.SMALL
                };
            case UI_ELEMENT.CONTAINER:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.NONE,
                    height: ELEMENT_HEIGHT.NONE
                };
            case UI_ELEMENT.IMAGE_VIEW:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MICRO,
                    height: ELEMENT_HEIGHT.SMALL
                };
            case UI_ELEMENT.LABEL:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.SMALL,
                    height: ELEMENT_HEIGHT.MEDIUM,
                    fontSize: CONSTANT.DEFAULT_FONT_SIZE
                };
            case UI_ELEMENT.LIST_VIEW:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MEDIUM,
                    height: ELEMENT_HEIGHT.MEDIUM
                };
            case UI_ELEMENT.PAGE_VIEW:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MEDIUM,
                    height: ELEMENT_HEIGHT.MEDIUM
                };
            case UI_ELEMENT.PANEL:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.HUGE,
                    height: ELEMENT_HEIGHT.HUGE
                };
            case UI_ELEMENT.PARTICLE:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.NONE,
                    height: ELEMENT_HEIGHT.NONE
                };
            case UI_ELEMENT.PROGRESS_BAR:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MEDIUM,
                    height: ELEMENT_HEIGHT.SMALL
                };
            case UI_ELEMENT.SCROLL_VIEW:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MEDIUM,
                    height: ELEMENT_HEIGHT.MEDIUM
                };
            case UI_ELEMENT.SLIDER:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MEDIUM,
                    height: ELEMENT_HEIGHT.SMALL
                };
            case UI_ELEMENT.SPINE:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.NONE,
                    height: ELEMENT_HEIGHT.NONE
                };
            case UI_ELEMENT.SPRITE:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.MICRO,
                    height: ELEMENT_HEIGHT.SMALL
                };
            case UI_ELEMENT.TEXT_FIELD:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.SMALL,
                    height: ELEMENT_HEIGHT.MEDIUM,
                    fontSize: CONSTANT.DEFAULT_FONT_SIZE
                };
            case UI_ELEMENT.TOGGLE_BUTTON:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.SMALL,
                    height: ELEMENT_HEIGHT.MEDIUM
                };
            case UI_ELEMENT.WIDGET:
                return {
                    ...commonProps,
                    width: ELEMENT_WIDTH.HUGE,
                    height: ELEMENT_HEIGHT.HUGE
                };
            default:
                return null;
        }
    }
}
