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

        this._addLayer(mCore.view.ComponentContainer, "grid");
        this._addLayer(mCore.view.ComponentContainer, "view");
        this._addLayer(mCore.ui.Widget, "interaction");

        this._stage.componentManager.addComponent(ComInteraction.create());
        this._stage.componentManager.addComponent(ComStageGrid.create());
        this._stage.componentManager.addComponent(ComStageView.create());
    }

    _addLayer(template, name)  {
        const layer = template.create();
        layer.name = name;
        this._stage.addChild(layer);
    }
}
