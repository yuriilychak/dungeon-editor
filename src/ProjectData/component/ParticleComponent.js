import FileComponent from "./FileComponent";

export default class ParticleComponent extends FileComponent {
    constructor(fileDir) {
        super(fileDir);

        /**
         * @type {Object.<string, Object>}
         * @private
         */

        this._sources = {};
    }

}
