import {DEFAULT_TEXTURE} from "../enum";
import {DEFAULT_ANCHOR} from "../constants";

const {mCore} = window;
const { view, ui } = mCore;

export default class BorderSelect extends view.ComponentContainer {
    constructor() {
        super();

        const additionalSize = 10;
        const mainSize = 6;
        this._createArea('Additional', additionalSize, additionalSize, 0xffffff);
        this._createArea('Main', mainSize, mainSize, 0x000000);
    }

    _createArea(name, width, height, tint) {
        const result = ui.ImageView.create(DEFAULT_TEXTURE.SIMPLE_RECT);

        result.name = name;
        result.width = width;
        result.height = height;
        result.tint = tint;
        result.anchor.set(DEFAULT_ANCHOR);

        this.addChild(result);
    }
}
