import {EVENT, CURSOR} from "../enum";
import {updateAnchor, getAnchorPosition, updatePosition} from "../utils";
import {EDIT_MODE} from "../../enum";

const {mCore, PIXI} = window;
const {math, geometry} = mCore.util;

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

        this._beginElementAngle = 0;

        this._beginEditAngle = 0;

        this._transform = new PIXI.Transform();

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
            this._onBorderOut,
            this._onBorderDragStart,
            this._onBorderDragFinish
        );
    }

    _addSelectListeners(path, onDrag, onOver, onOut, onDragStart, onDragFinish) {
        const {INTERACTIVE_EVENT} = mCore.enumerator.ui;

        this.addChildListener(onDrag, INTERACTIVE_EVENT.DRAG, path);
        this.addChildListener(onOver, INTERACTIVE_EVENT.OVER, path);
        this.addChildListener(onOut, INTERACTIVE_EVENT.OUT, path);

        if (onDragStart) {
            this.addChildListener(onDragStart, INTERACTIVE_EVENT.DRAG_START, path);
        }

        if (onDragFinish) {
            this.addChildListener(onDragFinish, INTERACTIVE_EVENT.DRAG_FINIS, path);
        }
    }

    _onBorderOver({target}) {
        const index = this._extractBorderIndex(target.name);
        const pointerPrefixes = [
            ["nwse", "ns", "nesw"],
            ["ew", "auto", "ew"],
            ["nesw", "ns", "nwse"]
        ];

        this._canvas.style.cursor = `${pointerPrefixes[index.y][index.x]}-resize`;
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
            default: {
                this._editMode = EDIT_MODE.SIZE;
                break;
            }
        }
    }

    _getElementWorldScale() {
        return geometry.pCompDiv(this._transform.scale, this.owner.parent.scale);
    }

    _isLeftButton(data) {
        return data.data.button === mCore.enumerator.MOUSE_BUTTON.LEFT;
    }

    _extractBorderIndex(name) {
        const radix = 10;
        const indices = name.split("_");
        return mCore.geometry.Point.create(
            parseInt(indices[2], radix),
            parseInt(indices[1], radix)
        );
    }

    _onBorderDragStart({data}) {
        if (this._editMode !== EDIT_MODE.SKEW) {
            return;
        }

        this._beginElementAngle = this._selectedElement.rotation;

        const ownerPos = this.owner.parent.toGlobal(this.owner.position);
        const offset = geometry.pSub(data.data.global, ownerPos, true);

        this._beginEditAngle = Math.atan2(offset.y, offset.x);
    }

    _onBorderDragFinish() {
        this._beginEditAngle = 0;
        this._beginElementAngle = 0;
    }

    _onBorderDrag({data, target}) {
        if (!this._isLeftButton(data)) {
            return;
        }

        const index = this._extractBorderIndex(target.name);
        const minSize = 12;


        switch (this._editMode) {
            case EDIT_MODE.SIZE: {
                const localPos = this._toLocal(data.data.global);

                const nextSize = mCore.geometry.Point.create(
                    math.max(this._calculateDimension(localPos, index.x, 'x', 'width'), minSize),
                    math.max(this._calculateDimension(localPos, index.y, 'y', 'height'), minSize)
                );

                this._refreshTransform();

                this.owner.width = nextSize.x;
                this.owner.height = nextSize.y;

                const elementWorldScale = this._getElementWorldScale();

                this._selectedElement.width = math.round(this.owner.width / elementWorldScale.x);
                this._selectedElement.height = math.round(this.owner.height / elementWorldScale.y);

                this.listenerManager.dispatchEvent(EVENT.ELEMENT_SIZE_CHANGE, geometry.pFromSize(this._selectedElement));

                nextSize.destroy();
                elementWorldScale.destroy();

                break;
            }
            case EDIT_MODE.SKEW: {
                if (index.x === index.y || math.abs(index.y - index.x) === 2) {
                    const ownerPos = this.owner.parent.toGlobal(this.owner.position);
                    const offset = geometry.pSub(data.data.global, ownerPos, true);
                    const rotation = this._beginElementAngle + Math.atan2(offset.y, offset.x) - this._beginEditAngle;

                    this.owner.rotation = rotation;
                    this._selectedElement.rotation = this._selectedElement.parent.worldTransform.c + rotation;
                } else {

                }
                break;
            }
            default: {
                const localPos = this._toLocal(data.data.global);
                const nextSize = mCore.geometry.Point.create(
                    this._calculateDimension(localPos, index.x, 'x', 'width'),
                    this._calculateDimension(localPos, index.y, 'y', 'height')
                );

                this._refreshTransform();

                const elementSize = geometry.pFromSize(this._selectedElement);
                const parentScale = geometry.pCompDiv(
                    this._getElementWorldScale(),
                    this._selectedElement.scale,
                    true
                );

                this._selectedElement.scale.copyFrom(geometry.pCompDiv(nextSize, geometry.pCompMult(elementSize, parentScale)));
                this.owner.width = nextSize.x;
                this.owner.height = nextSize.y;

                elementSize.destroy();
                parentScale.destroy();
                nextSize.destroy();
                break;
            }
        }
    }

    _calculateDimension(localPos, index, cord, dimension) {
        switch (index) {
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
        this._dragPosition.copyFrom(data.data.global);
    }

    _onPositionDragMove({data}) {
        if (!this._isLeftButton(data)) {
            return;
        }
        const nextPos = data.data.global;

        updatePosition(this.owner, this._dragPosition, nextPos);
        updatePosition(this._selectedElement, this._dragPosition, nextPos);

        this._dragPosition.copyFrom(nextPos);

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
        return this.owner.toLocal(point);
    }

    _refreshTransform() {
        this._selectedElement.updateTransform();
        this._selectedElement.worldTransform.decompose(this._transform);
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

        this._refreshTransform();

        this.owner.rotation = this._transform.rotation;

        this.owner.skew.copyFrom(this._transform.skew);

        const ownerSize = geometry.pRound(
            geometry.pCompMult(
                geometry.pFromSize(this._selectedElement),
                this._getElementWorldScale(),
                true
            ),
            true
        );

        this.owner.width = ownerSize.x;
        this.owner.height = ownerSize.y;

        ownerSize.destroy();

        updateAnchor(this.owner, this._selectedElement.anchor);

        this.owner.refreshAnchorElement();

        const pointToCheck = this._zeroPositionTypes.includes(this._selectedElement.uiType) ? this._zeroPoint : getAnchorPosition(this._selectedElement);

        this.owner.position.copyFrom(this._toParentCoords(this._selectedElement.toGlobal(pointToCheck)));
    }
}
