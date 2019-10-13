import {DEFAULT_TEXTURE} from "../enum";
import {DEFAULT_ANCHOR} from "../constants";

const {mCore} = window;
const { view, ui } = mCore;

export default class BorderSelect extends view.ComponentContainer {
    constructor() {
        super();
        this._createArea('Additional', 14, 14, 0xffffff);
        this._createArea('Main', 8, 8, 0x000000);
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
