import StageGrid from "../stage-grid/stage-grid";

export default class EditScene extends window.mCore.view.Scene {
    constructor() {
        super();
        this._stageGrid = StageGrid.create();
        this.addChild(this._stageGrid);
    }

    get zoom() {
        return this._stageGrid.zoom;
    }

    set zoom(value) {
        this._stageGrid.zoom = value;
    }

    /**
     * @public
     * @returns {?Function}
     */

    get zoomCallback() {
        return this._stageGrid.zoomCallback;
    }

    set zoomCallback(value) {
        this._stageGrid.zoomCallback = value;
    }
}
