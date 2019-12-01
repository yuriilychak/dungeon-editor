import {DEFAULT_TEXTURE, DEFAULT_SIZE} from "../enum";
import {DEFAULT_ANCHOR, DEFAULT_TEXT_COLOR} from "../constants";
import BorderSelect from "./border-select";
import { updateAnchor } from "../utils";

const {mCore, PIXI } = window;
const { ui, util } = mCore;

export default class EditArea extends ui.Widget {
    constructor ()  {
        super();

        this._linkedElement = null;

        this._elementsForScaleUpdate = [];

        this._borders = [];

        this.name = "EditArea";

        this._anchorDragEvent = "EDIT_AREA.ANCHOR_DRAG";
        this._anchorChangeEvent = "EDIT_AREA.ANCHOR_CHANGE";

        this._borderDragEvent = "EDIT_AREA.BORDER_DRAG";
        this._sizeChangeEvent = "EDIT_AREA.SIZE_CHANGE";

        this._positionDragStartEvent = "EDIT_AREA.POSITION_DRAG_START";
        this._positionDragMoveEvent = "EDIT_AREA.POSITION_DRAG_MOVE";
        this._positionDragFinishEvent = "EDIT_AREA.POSITION_DRAG_FINISH";

        this._dragPosition = mCore.geometry.Point.create();

        this._positionChangeEvent = "EDIT_AREA.POSITION_CHANGE";

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
                    element.interactive = true;
                    element.interactionManager.eventDrag = this._anchorDragEvent;
                }
                else {
                    element = BorderSelect.create();
                    updateAnchor = false;
                    name = `BorderSelect_${i}_${j}`;
                    element.interactive = true;
                    element.interactionManager.eventDrag = this._borderDragEvent;
                }
                this._setElementParams(element, name, j * halfWidth, i * halfHeight, updateAnchor);
                this._elementsForScaleUpdate.push(element);
            }
        }

        this.anchor.set(DEFAULT_ANCHOR);

        this.interactive = true;

        this.interactionManager.propagateChildrenEvents = false;

        this.interactionManager.eventDragStart = this._positionDragStartEvent;
        this.interactionManager.eventDrag = this._positionDragMoveEvent;
        this.interactionManager.eventDragFinish = this._positionDragFinishEvent;

        this.listenerManager.addEventListener(this._anchorDragEvent, this._onAnchorDrag);
        this.listenerManager.addEventListener(this._borderDragEvent, this._onBorderDrag);

        this.listenerManager.addEventListener(this._positionDragStartEvent, this._onPositionDragStart);
        this.listenerManager.addEventListener(this._positionDragMoveEvent, this._onPositionDragMove);
        this.listenerManager.addEventListener(this._positionDragFinishEvent, this._onPositionDragFinish);
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

    _onAnchorDrag({data}) {
        const anchor = util.geometry.pCompDiv(this.toLocal(data.data.global), util.geometry.pFromSize(this));

        anchor.x = util.math.toFixed(anchor.x, 2);
        anchor.y = util.math.toFixed(anchor.y, 2);

        updateAnchor(this, anchor);

        this.listenerManager.dispatchEvent(this._anchorChangeEvent, anchor);
        this._anchorElement.position.copyFrom(this.toLocal(data.data.global));
    }

    _onBorderDrag({data, target}) {
        const indices = target.name.split("_");
        const rowIndex = parseInt(indices[1], 10);
        const colIndex = parseInt(indices[2], 10);
        const localPos = this.toLocal(data.data.global);
        const offset = mCore.geometry.Point.create();

        switch(rowIndex) {
            case 0: {
                offset.y = -localPos.y;
                break;
            }
            case 1: {
                offset.y = 0;
                break;
            }
            default: {
                offset.y = localPos.y - this.height;
                break;
            }
        }

        switch(colIndex) {
            case 0: {
                offset.x = -localPos.x;
                break;
            }
            case 1: {
                offset.x = 0;
                break;
            }
            default: {
                offset.x = localPos.x - this.width;
                break;
            }
        }

        this.listenerManager.dispatchEvent(this._sizeChangeEvent, offset);
    }

    _onPositionDragStart({data}) {
        this._dragPosition.copyFrom(this.parent.toLocal(data.data.global));
    }

    _onPositionDragMove({data}) {
        const nextPos = this.parent.toLocal(data.data.global);
        const offset = util.geometry.pSub(nextPos, this._dragPosition);

        this._dragPosition.copyFrom(nextPos);

        this.position.x += offset.x;
        this.position.y += offset.y;

        this.listenerManager.dispatchEvent(this._positionChangeEvent, offset);
    }

    _onPositionDragFinish({data}) {
        this._dragPosition.set(0, 0);
    }

    get linkedElement() {
        return this._linkedElement;
    }

    set linkedElement(element) {
        if (this._linkedElement === element) {
            return;
        }

        this._linkedElement = element;

        this.anchor.copyFrom(this._linkedElement.anchor);

        this._anchorElement.position.copyFrom(util.geometry.pCompMult(this.anchor, util.geometry.pFromSize(this._linkedElement)));

        this.width = this._linkedElement.width;
        this.height = this._linkedElement.height;

        const pointToCheck = this._linkedElement.uiType === mCore.enumerator.ui.UI_ELEMENT.IMAGE_VIEW ||
            this._linkedElement.uiType === mCore.enumerator.ui.UI_ELEMENT.SPRITE
            ? { x: 0, y : 0}
            : this._anchorElement.position;

        this.position.copyFrom(this.parent.toLocal(this._linkedElement.toGlobal(pointToCheck)));
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

    get anchorChangeEvent() {
        return this._anchorChangeEvent;
    }

    get sizeChangeEvent() {
        return this._sizeChangeEvent;
    }

    get positionChangeEvent() {
        return this._positionChangeEvent;
    }
}
