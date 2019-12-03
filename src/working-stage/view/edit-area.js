import {DEFAULT_TEXTURE, DEFAULT_SIZE} from "../enum";
import {DEFAULT_ANCHOR, DEFAULT_TEXT_COLOR} from "../constants";
import BorderSelect from "./border-select";
import { getAnchorPosition } from "../utils";

const {mCore, PIXI } = window;
const { ui, util } = mCore;

export default class EditArea extends ui.Widget {
    constructor ()  {
        super();

        this._elementsForScaleUpdate = [];

        this._borders = [];

        this.name = "EditArea";

        this._anchorElement = null;

        super.width = DEFAULT_SIZE.PANEL.width;
        super.height = DEFAULT_SIZE.PANEL.height;

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
                    this._anchorElement = element;
                }
                else {
                    element = BorderSelect.create();
                    updateAnchor = false;
                    name = `BorderSelect_${i}_${j}`;

                }

                element.interactive = true;

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

    refreshAnchorElement() {
        this._anchorElement.position.copyFrom(getAnchorPosition(this));
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

    get width() {
        return super.width;
    }

    set width(value) {
        const halfValue = util.math.divPowTwo(value);
        super.width = value;
        this._selectSprite.width = value;
        this._borders[0].width = value;
        this._borders[0].position.x = halfValue;
        this._borders[2].width = value;
        this._borders[2].position.x = halfValue;
        this._borders[3].position.x = value;
        this._elementsForScaleUpdate[1].position.x = halfValue;
        this._elementsForScaleUpdate[2].position.x = value;
        this._elementsForScaleUpdate[5].position.x = value;
        this._elementsForScaleUpdate[7].position.x = halfValue;
        this._elementsForScaleUpdate[8].position.x = value;
        this._anchorElement.position.x = this.anchor.x * value;
    }

    get height() {
        return super.height;
    }

    set height(value) {
        const halfValue = util.math.divPowTwo(value);
        super.height = value;
        this._selectSprite.height = value;
        this._borders[1].height = value;
        this._borders[1].position.y = halfValue;
        this._borders[3].height = value;
        this._borders[3].position.y = halfValue;
        this._borders[2].position.y = value;
        this._elementsForScaleUpdate[3].position.y = halfValue;
        this._elementsForScaleUpdate[5].position.y = halfValue;
        this._elementsForScaleUpdate[6].position.y = value;
        this._elementsForScaleUpdate[7].position.y = value;
        this._elementsForScaleUpdate[8].position.y = value;
        this._anchorElement.position.y = this.anchor.y * value;
    }
}
