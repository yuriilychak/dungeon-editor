import FileComponent from "./FileComponent";

export default class SkeletonComponent extends FileComponent {
    constructor(fileDir) {
        super(fileDir);

        /**
         * @type {Object.<string, Object>}
         * @private
         */

        this._skeletonSources = {};

        /**
         * @type {Object.<string, string>}
         * @private
         */

        this._skeletonAtlases = {};

        /**
         * @type {Object.<string, string>}
         * @private
         */

        this._skeletonTextures = {};
    }
}
