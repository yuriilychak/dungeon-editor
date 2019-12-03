import {EVENT} from "../enum";
import { updateAnchor, getAnchorPosition } from "../utils";

const { mCore } = window;
const { math, geometry } = mCore.util;

export default class ComElementTransform extends mCore.component.ui.ComUI {
    constructor() {
        super("ComElementTransform");

        this._selectedElement = null;

        this._canvas = document.getElementById("WorkingCanvas");

        this._dragPosition = mCore.geometry.Point.create();

        this._positionDragStartEvent = "EDIT_AREA.POSITION_DRAG_START";
        this._positionDragMoveEvent = "EDIT_AREA.POSITION_DRAG_MOVE";
        this._positionDragFinishEvent = "EDIT_AREA.POSITION_DRAG_FINISH";
    }

    onAdd(owner) {
        super.onAdd(owner);

        this.listenerManager.addEventListener(EVENT.ELEMENT_CLICK, this._onElementClick);
        this.listenerManager.addEventListener(this._positionDragStartEvent, this._onPositionDragStart);
        this.listenerManager.addEventListener(this._positionDragMoveEvent, this._onPositionDragMove);
        this.listenerManager.addEventListener(this._positionDragFinishEvent, this._onPositionDragFinish);

        this.addChildListener(this._onAnchorOver, mCore.enumerator.ui.INTERACTIVE_EVENT.OVER, "AnchorSelect");
        this.addChildListener(this._onAnchorOut, mCore.enumerator.ui.INTERACTIVE_EVENT.OUT, "AnchorSelect");
        this.addChildListener(this._onAnchorDrag, mCore.enumerator.ui.INTERACTIVE_EVENT.DRAG, "AnchorSelect");

        let i, j;

        for (i = 0; i < 3; ++i) {
            for (j = 0; j < 3; ++j) {
                if ( !(i === j && i === 1)) {
                    this._initBorderSelect(i, j);
                }
            }
        }
    }

    _initBorderSelect(rowIndex, columnIndex) {
        this.addChildListener(this._onBorderDrag, mCore.enumerator.ui.INTERACTIVE_EVENT.DRAG, `BorderSelect_${rowIndex}_${columnIndex}`);
        this.addChildListener(this._onBorderOver, mCore.enumerator.ui.INTERACTIVE_EVENT.OVER, `BorderSelect_${rowIndex}_${columnIndex}`);
        this.addChildListener(this._onBorderOut, mCore.enumerator.ui.INTERACTIVE_EVENT.OUT, `BorderSelect_${rowIndex}_${columnIndex}`);
    }

    _onBorderOver({target}) {
        const indices = target.name.split("_");
        const rowIndex = parseInt(indices[1], 10);
        const colIndex = parseInt(indices[2], 10);
        let pointerPrefixes = [
            ["nwse", "ns", "nesw"],
            ["ew", "", "ew"],
            ["nesw", "ns", "nwse"]
        ];

        this._canvas.style.cursor = `${pointerPrefixes[rowIndex][colIndex]}-resize`;
    }

    _onBorderOut() {
        this._canvas.style.cursor = "auto";
    }

    _onAnchorOver() {
        this._canvas.style.cursor = "pointer";
    }

    _onAnchorOut() {
        this._canvas.style.cursor = "auto";
    }

    _onAnchorDrag({data}) {
        const anchor = geometry.pCompDiv(this.owner.toLocal(data.data.global), geometry.pFromSize(this.owner));

        anchor.x = math.toFixed(anchor.x, 2);
        anchor.y = math.toFixed(anchor.y, 2);

        updateAnchor(this.owner, anchor);
        updateAnchor(this._selectedElement, anchor);

        this.owner.refreshAnchorElement();

        this.listenerManager.dispatchEvent(EVENT.ELEMENT_ANCHOR_CHANGE, anchor);
    }

    _onElementClick({target}) {
        this.selectedElement = target;
    }

    _onBorderDrag({data, target}) {
        const indices = target.name.split("_");
        const rowIndex = parseInt(indices[1], 10);
        const colIndex = parseInt(indices[2], 10);
        const localPos = this.owner.toLocal(data.data.global);
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
                offset.y = localPos.y - this.owner.height;
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
                offset.x = localPos.x - this.owner.width;
                break;
            }
        }

        if (this.owner.width  + offset.x > 12) {
            this.owner.width += offset.x;
            this._selectedElement.width += offset.x;
        }

        if (this.owner.height  + offset.y > 12) {
            this.owner.height += offset.y;
            this._selectedElement.height += offset.y;
        }

        this.listenerManager.dispatchEvent(EVENT.ELEMENT_SIZE_CHANGE, geometry.pFromSize(this.owner));
    }

    _onPositionDragStart({data}) {
        this._canvas.style.cursor = "move";
        this._dragPosition.copyFrom(this.owner.parent.toLocal(data.data.global));
    }

    _onPositionDragMove({data}) {
        const nextPos = this.owner.parent.toLocal(data.data.global);
        const offset = geometry.pSub(nextPos, this._dragPosition);

        this._dragPosition.copyFrom(nextPos);

        this.owner.position.x += offset.x;
        this.owner.position.y += offset.y;

        this._selectedElement.position.x += offset.x;
        this._selectedElement.position.y += offset.y;

        this.listenerManager.dispatchEvent(EVENT.ELEMENT_POSITION_CHANGE, this._selectedElement.position);
    }

    _onPositionDragFinish() {
        this._canvas.style.cursor = "auto";
        this._dragPosition.set(0, 0);
    }

    get selectedElement() {
        return this._selectedElement;
    }

    set selectedElement(element) {
        if (this._selectedElement === element) {
            return;
        }

        if (this._selectedElement) {
            this._selectedElement.interactionManager.eventDragStart = null;
            this._selectedElement.interactionManager.eventDrag = null;
            this._selectedElement.interactionManager.eventDragFinish = null;
        }

        this._selectedElement = element;

        this._selectedElement.interactionManager.eventDragStart = this._positionDragStartEvent;
        this._selectedElement.interactionManager.eventDrag = this._positionDragMoveEvent;
        this._selectedElement.interactionManager.eventDragFinish = this._positionDragFinishEvent;

        this.owner.width = this._selectedElement.width;
        this.owner.height = this._selectedElement.height;

        updateAnchor(this.owner, this._selectedElement.anchor);

        this.owner.refreshAnchorElement();

        const pointToCheck = this._selectedElement.uiType === mCore.enumerator.ui.UI_ELEMENT.IMAGE_VIEW ||
        this._selectedElement.uiType === mCore.enumerator.ui.UI_ELEMENT.SPRITE
            ? { x: 0, y : 0}
            : getAnchorPosition(this._selectedElement);

        this.owner.position.copyFrom(this.owner.parent.toLocal(this._selectedElement.toGlobal(pointToCheck)));
    }
}
