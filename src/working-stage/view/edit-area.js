import {DEFAULT_TEXTURE, DEFAULT_SIZE} from "../enum";
import {DEFAULT_ANCHOR, DEFAULT_TEXT_COLOR} from "../constants";
import BorderSelect from "./border-select";

const {mCore, PIXI } = window;
const { ui, util } = mCore;

export default class EditArea extends ui.Widget {
    constructor ()  {
        super();

        this._elementsForScaleUpdate = [];

        this._borders = [];

        this.name = "EditArea";

        this.width = DEFAULT_SIZE.PANEL.width;
        this.height = DEFAULT_SIZE.PANEL.height;

        this._selectSprite = new PIXI.TilingSprite(PIXI.Texture.from(DEFAULT_TEXTURE.SELECT), this.width, this.height);

        this.addChild(this._selectSprite);

        let i, j, element, name, updateAnchor;
        const stepCount = 3;
        const halfWidth = util.math.divPowTwo(this.width);
        const halfHeight = util.math.divPowTwo(this.height);
        const borderSize = 2;

        for (i = 0; i < 2; ++i) {
            this._borders.push(this._createBorder(`Border_horizontal_${i}`, this.width, borderSize, halfWidth, i * this.height));
            this._borders.push(this._createBorder(`Border_vertical_${i}`, borderSize, this.height, i * this.width, halfHeight));
        }

        for (i = 0; i < stepCount; ++i) {
            for (j = 0; j < stepCount; ++j) {
                if (i === j && i === 1) {
                    element = ui.ImageView.create(DEFAULT_TEXTURE.CIRCLE);
                    updateAnchor = true;
                    name = "AnchorSelect";
                }
                else {
                    element = BorderSelect.create();
                    updateAnchor = false;
                    name = `BorderSelect_${i}_${j}`;
                }
                this._setElementParams(element, name, j * halfWidth, i * halfHeight, updateAnchor);
                this._elementsForScaleUpdate.push(element);
            }
        }

        this.anchor.set(DEFAULT_ANCHOR);
    }

    changeScale(scale) {
        const revertedScale = 1 / scale;
        const defaultScale = 1;

        this._borders.forEach((border, index) => {
            if (index % 2 === 0) {
                border.scale.set(defaultScale, revertedScale)
            }
            else {
                border.scale.set(revertedScale, defaultScale);
            }
        });

        this._elementsForScaleUpdate.forEach(element => element.scale.set(revertedScale));

        this._selectSprite.tileScale.set(revertedScale);
    }

    _setElementParams(element, name, x, y, updateAnchor) {
        element.name = name;
        element.position.set(x, y);

        if (updateAnchor) {
            element.anchor.set(DEFAULT_ANCHOR);
        }

        this.addChild(element);
    }

    _createBorder(name, width, height, x, y) {
        const result = ui.ImageView.create(DEFAULT_TEXTURE.SIMPLE_RECT);

        result.width = width;
        result.height = height;
        result.tint = DEFAULT_TEXT_COLOR;

        this._setElementParams(result, name, x, y, true);

        return result;
    }
}
