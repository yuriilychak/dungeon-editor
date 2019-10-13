import {  ComInteraction, ComStageGrid, ComStageView } from "../component";

const { mCore } = window;

export default class EditScene extends window.mCore.view.Scene {
    constructor() {
        super();

        /**
         * @type {mCore.view.ComponentContainer}
         * @private
         */
        this._stage = mCore.view.ComponentContainer.create();

        this.addChild(this._stage);

        this._addLayer("grid");
        this._addLayer("view");

        this._addComponent(ComInteraction);
        this._addComponent(ComStageGrid);
        this._addComponent(ComStageView);
    }

    _addComponent(template) {
        this._stage.componentManager.addComponent(template.create());
    }

    _addLayer(name)  {
        const layer = mCore.view.ComponentContainer.create();
        layer.name = name;
        this._stage.addChild(layer);
    }
}
