import StageGrid from "../stage-grid/stage-grid";

export default class EditScene extends window.mCore.view.Scene {
    constructor() {
        super();
        /**
         * @type {mCore.ui.Widget}
         * @private
         */
        this._stageGrid = StageGrid.create();

        this.addChild(this._stageGrid);
    }
}
