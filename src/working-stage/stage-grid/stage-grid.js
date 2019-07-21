import ComStageGrid from "../component/com-stage-grid";

const { mCore } = window;

export default class StageGrid extends mCore.ui.Widget {
    constructor() {
        super();
        this.componentManager.addComponent(ComStageGrid.create());
    }
}
