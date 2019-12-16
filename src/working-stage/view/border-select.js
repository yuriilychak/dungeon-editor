import {DEFAULT_TEXTURE} from "../enum";
import {DEFAULT_ANCHOR} from "../constants";

const {mCore} = window;
const { ui } = mCore;

export default class BorderSelect extends ui.Widget {
    constructor() {
        super();

        this.width = 12;
        this.height = 12;
        const additionalSize = 12;
        const mainSize = 8;
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
