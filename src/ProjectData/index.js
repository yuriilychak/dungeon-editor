import JSZip from "jszip";
import store from "../store";
import projectTemplate from "../data/ProjectTemplate";
import {changeProgress} from "../ExportProjectDialog/action";
import { saveAs } from 'file-saver';

export default {
    /**
     * @type {Object}
     */
    _projectData: null,

    /**
     * @type {?Blob}
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
        const zip = new JSZip();

        store.dispatch(changeProgress(50, "meta.json"));

        zip.file("meta.json", JSON.stringify(this._projectData));

        store.dispatch(changeProgress(100));

        zip.generateAsync({type:"blob"})
            .then(content => {
                this._zipData = content;
                store.dispatch(changeProgress(100, null, true));
            });
    },

    /**
     * @function
     * @public
     */

    save() {
        saveAs(this._zipData, `${this._projectData.name}.zip`);
    }
}
