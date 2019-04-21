import JSZip from "jszip";
import store from "../store";
import projectTemplate from "./data/ProjectTemplate";
import {changeProgress} from "../ExportProjectDialog/action";
import { saveAs } from 'file-saver';

export default {

    /**
     * @type {Object}
     * @private
     */

    _projectData: null,

    /**
     * @type {?JSZip}
     * @private
     */

    _zip: null,

    /**
     * @type {?Blob}
     * @private
     */

    _zipData: null,

    /**
     * @function
     * @public
     */

    init() {
        this._projectData =  {...projectTemplate};
    },

    /**
     * @function
     * @public
     * @param {string} name
     */

    rename(name) {
        this._projectData.name = name;
    },

    /**
     * @function
     * @public
     */

    export() {
        this._zip = new JSZip();

        store.dispatch(changeProgress(50, "meta.json"));

        this._zip.file("meta.json", JSON.stringify(this._projectData));

        store.dispatch(changeProgress(100));

        this._zip.generateAsync({ type: "blob" })
            .then(content => {
                this._zipData = content;
                store.dispatch(changeProgress(100, null, true));
            });
    },

    /**
     * @desc Clear zip
     * @function
     * @public
     */

    clearZipData() {
        this._zip = null;
        this._zipData = null;
    },

    /**
     * @function
     * @public
     */

    save() {
        if (this._zipData === null) {
            return;
        }
        this._zip = null;
        saveAs(this._zipData, `${this._projectData.name}.zip`);
    }
}
