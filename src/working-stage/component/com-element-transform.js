import {EVENT, CURSOR, MOUSE_BUTTON} from "../enum";
import { updateAnchor, getAnchorPosition } from "../utils";
import {EDIT_MODE} from "../../enum";

const { mCore } = window;
const { math, geometry } = mCore.util;

export default class ComElementTransform extends mCore.component.ui.ComUI {
    constructor() {
        super("ComElementTransform");

        /**
         * @type {EDIT_MODE}
         * @private
         */

        this._editMode = EDIT_MODE.SIZE;

        /**
         * @type {?mCore.view.ComponentContainer}
         * @private
         */

        this._selectedElement = null;

        /**
         * @type {HTMLElement}
         * @private
         */

        this._canvas = document.getElementById("WorkingCanvas");

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._dragPosition = mCore.geometry.Point.create();

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._zeroPoint = mCore.geometry.Point.create();

        /**
         * @type {mCore.enumerator.ui.UI_ELEMENT[]}
         * @private
         */

        this._zeroPositionTypes = [
            mCore.enumerator.ui.UI_ELEMENT.IMAGE_VIEW,
            mCore.enumerator.ui.UI_ELEMENT.SPRITE
        ];

        this._positionDragStartEvent = "EDIT_AREA.POSITION_DRAG_START";
        this._positionDragMoveEvent = "EDIT_AREA.POSITION_DRAG_MOVE";
        this._positionDragFinishEvent = "EDIT_AREA.POSITION_DRAG_FINISH";
    }

    onAdd(owner) {
        super.onAdd(owner);

        this.listenerManager.addEventListener(EVENT.EDIT_MODE_CHANGE_OUTSIDE, this._refreshEditMode);
        this.listenerManager.addEventListener(EVENT.ELEMENT_CLICK, this._onElementClick);
        this.listenerManager.addEventListener(this._positionDragStartEvent, this._onPositionDragStart);
        this.listenerManager.addEventListener(this._positionDragMoveEvent, this._onPositionDragMove);
        this.listenerManager.addEventListener(this._positionDragFinishEvent, this._onPositionDragFinish);

        this._addSelectListeners(
            "AnchorSelect",
            this._onAnchorDrag,
            this._onAnchorOver,
            this._onAnchorOut
        );

        let i, j;
        const itemCount = 3;

        for (i = 0; i < itemCount; ++i) {
            for (j = 0; j < itemCount; ++j) {
                if (!(i === j && i === 1)) {
                    this._initBorderSelect(i, j);
                }
            }
        }
    }

    _initBorderSelect(rowIndex, columnIndex) {
        this._addSelectListeners(
            `BorderSelect_${rowIndex}_${columnIndex}`,
            this._onBorderDrag,
            this._onBorderOver,
            this._onBorderOut
        );
    }

    _addSelectListeners(path, onDrag, onOver, onOut) {
        const { INTERACTIVE_EVENT } = mCore.enumerator.ui;
        this.addChildListener(onDrag, INTERACTIVE_EVENT.DRAG, path);
        this.addChildListener(onOver, INTERACTIVE_EVENT.OVER, path);
        this.addChildListener(onOut, INTERACTIVE_EVENT.OUT, path);
    }

    _onBorderOver({target}) {
        const index = this._extractBorderIndex(target.name);
        const pointerPrefixes = [
            ["nwse", "ns", "nesw"],
            ["ew", "auto", "ew"],
            ["nesw", "ns", "nwse"]
        ];

        this._canvas.style.cursor = `${pointerPrefixes[index.x][index.y]}-resize`;
    }

    _onBorderOut() {
        this._canvas.style.cursor = CURSOR.AUTO;
    }

    _onAnchorOver() {
        this._canvas.style.cursor = CURSOR.POINTER;
    }

    _onAnchorOut() {
        this._canvas.style.cursor = CURSOR.AUTO;
    }

    _onAnchorDrag({data}) {
        if (!this._isLeftButton(data)) {
            return;
        }

        const anchor = geometry.pCompDiv(this._toLocal(data.data.global), geometry.pFromSize(this.owner));

        anchor.x = math.toFixed(anchor.x);
        anchor.y = math.toFixed(anchor.y);

        updateAnchor(this.owner, anchor);
        updateAnchor(this._selectedElement, anchor);

        this.owner.refreshAnchorElement();

        this.listenerManager.dispatchEvent(EVENT.ELEMENT_ANCHOR_CHANGE, anchor);
    }

    _onElementClick({target, data}) {
        if (!this._isLeftButton(data)) {
            return;
        }

        if (this.selectedElement === target) {
            this.listenerManager.dispatchEvent(EVENT.EDIT_MODE_CHANGE_INSIDE);
            this._refreshEditMode();
            return;
        }

        this.selectedElement = target;
    }

    _refreshEditMode() {
        switch (this._editMode) {
            case EDIT_MODE.SIZE: {
                this._editMode = EDIT_MODE.SKEW;
                break;
            }
            case EDIT_MODE.SKEW: {
                this._editMode = EDIT_MODE.SCALE;
                break;
            }
            case EDIT_MODE.SCALE: {
                this._editMode = EDIT_MODE.SIZE;
                break;
            }
        }
    }

    _isLeftButton(data) {
        /*
         * TODO FIx in manticore. Drag event don't return button id.
         */
        return true;
    }

    _extractBorderIndex(name) {
        const radix = 10;
        const indices = name.split("_");
        return mCore.geometry.Point.create(
            parseInt(indices[1], radix),
            parseInt(indices[2], radix)
        );
    }

    _onBorderDrag({data, target}) {
        if (!this._isLeftButton(data)) {
            return;
        }

        const index = this._extractBorderIndex(target.name);
        const minSize = 12;


        switch(this._editMode) {
            case EDIT_MODE.SIZE: {
                const localPos = this._toLocal(data.data.global);

                this._updateDimension(localPos, minSize, index.x, "y", "height", 'a');
                this._updateDimension(localPos, minSize, index.y, "x", "width", 'd');

                this.listenerManager.dispatchEvent(EVENT.ELEMENT_SIZE_CHANGE, geometry.pFromSize(this._selectedElement));
                break;
            }
            case EDIT_MODE.SKEW: {
                if (index.x === index.y || math.abs(index.x - index.y) === 2) {
                    const ownerPos = this._toParentCoords(this.owner.toGlobal(getAnchorPosition(this.owner)));
                    const pointerPos = this._toParentCoords(data.data.global);
                    const offset = geometry.pSub(pointerPos, ownerPos, true);
                    const rotation = Math.atan2(offset.y, offset.x);
                    this.owner.rotation = rotation;
                    this._selectedElement.rotation = rotation;
                }
                break;
            }
            case EDIT_MODE.SCALE: {
                const localPos = this._toLocal(data.data.global);
                const nextWidth = this._calculateDimension(localPos, index.y, 'x', 'width', 'a');
                const nextHeight = this._calculateDimension(localPos, index.x, 'y', 'height', 'd');
                this._selectedElement.scale.set(
                    nextWidth / this._selectedElement.width,
                    nextHeight / this._selectedElement.height
                );
                this.owner.width = nextWidth;
                this.owner.height = nextHeight;
                break;
            }
        }
    }

    _updateDimension(localPos, minSize, index, cord, dimension, transform) {

        const nextDimension = this._calculateDimension(localPos, index, cord, dimension);

        if (nextDimension > minSize) {
            this.owner[dimension] = nextDimension;
            this._selectedElement[dimension] = nextDimension / this._selectedElement.worldTransform[transform];
        }
    }

    _calculateDimension(localPos, index, cord, dimension) {
        switch(index) {
            case 0: {
                return math.round(this.owner[dimension] - localPos[cord]);
            }
            case 1: {
                return math.round(this.owner[dimension]);
            }
            default: {
                return math.round(localPos[cord]);
            }
        }
    }

    _onPositionDragStart({data}) {
        if (!this._isLeftButton(data)) {
            return;
        }
        this._canvas.style.cursor = CURSOR.MOVE;
        this._dragPosition.copyFrom(this._toParentCoords(data.data.global));
    }

    _onPositionDragMove({data}) {
        if (!this._isLeftButton(data)) {
            return;
        }
        const nextPos = this._toParentCoords(data.data.global);
        const offset = geometry.pSub(nextPos, this._dragPosition);

        this._dragPosition.copyFrom(nextPos);

        geometry.pAdd(this.owner.position, offset, true);
        geometry.pAdd(this._selectedElement.position, offset, true);

        this.listenerManager.dispatchEvent(EVENT.ELEMENT_POSITION_CHANGE, this._selectedElement.position);
    }

    _onPositionDragFinish({data}) {
        if (!this._isLeftButton(data)) {
            return;
        }
        this._canvas.style.cursor = CURSOR.AUTO;
        this._dragPosition.set(0, 0);
    }

    _setSelectedElementListeners(
        eventDragStart = null,
        eventDrag = null,
        eventDragFinish = null
    ) {
        this._selectedElement.interactionManager.eventDragStart = eventDragStart;
        this._selectedElement.interactionManager.eventDrag = eventDrag;
        this._selectedElement.interactionManager.eventDragFinish = eventDragFinish;
    }

    _toParentCoords(point) {
        return this.owner.parent.toLocal(point);
    }

    _toLocal(point) {
        return  this.owner.toLocal(point);
    }

    get selectedElement() {
        return this._selectedElement;
    }

    set selectedElement(element) {
        if (this._selectedElement === element) {
            return;
        }

        if (this._selectedElement) {
            this._setSelectedElementListeners();
        }

        this._selectedElement = element;

        this._setSelectedElementListeners(
            this._positionDragStartEvent,
            this._positionDragMoveEvent,
            this._positionDragFinishEvent
        );

        this.owner.rotation = this._selectedElement.rotation;

        this.owner.width = this._selectedElement.width * this._selectedElement.worldTransform.a;
        this.owner.height = this._selectedElement.height * this._selectedElement.worldTransform.d;

        updateAnchor(this.owner, this._selectedElement.anchor);

        this.owner.refreshAnchorElement();

        const pointToCheck = this._zeroPositionTypes.includes(this._selectedElement.uiType) ? this._zeroPoint : getAnchorPosition(this._selectedElement);

        this.owner.position.copyFrom(this._toParentCoords(this._selectedElement.toGlobal(pointToCheck)));
    }
}
