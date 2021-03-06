import { EVENT, CURSOR } from "../enum";
import { updateAnchor, getAnchorPosition, updatePosition, getHorizontalEdge, getVerticalEdge, updateMargin, generateProp, generatePoint, isLeftButton, extractBorderIndex } from "../utils";
import { EDIT_MODE, PROPERTY_LOCATION, STAGE_ELEMENT_PROP, VALUE_FORMAT } from "../../enum";
import { MARGIN_DIRECTION } from "../constants";

const { mCore, PIXI } = window;
const { math, geometry, color } = mCore.util;

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

        this._globalStart = mCore.geometry.Point.create();

        this._minSize = mCore.geometry.Point.create(12, 12);

        this._changeCounter = 0;

        this._changeKey = null;

        this._positionDragStartEvent = "EDIT_AREA.POSITION_DRAG_START";
        this._positionDragMoveEvent = "EDIT_AREA.POSITION_DRAG_MOVE";
        this._positionDragFinishEvent = "EDIT_AREA.POSITION_DRAG_FINISH";
    }

    onAdd(owner) {
        super.onAdd(owner);

        this.listenerManager.addEventListener(EVENT.EDIT_MODE_CHANGE_OUTSIDE, this._refreshEditMode);
        this.listenerManager.addEventListener(EVENT.ELEMENT_CLICK, this._onElementClick);
        this.listenerManager.addEventListener(EVENT.ELEMENT_CHANGE_OUTSIDE, this._onChangeTransform);
        this.listenerManager.addEventListener(this._positionDragStartEvent, this._onPositionDragStart);
        this.listenerManager.addEventListener(this._positionDragMoveEvent, this._onPositionDragMove);
        this.listenerManager.addEventListener(this._positionDragFinishEvent, this._onPositionDragFinish);

        this._addSelectListeners(
            "AnchorSelect",
            this._onAnchorDrag,
            this._onAnchorOver,
            this._onAnchorOut,
            this._onAnchorDragStart,
            this._onAnchorDragFinish
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
        const { INTERACTIVE_EVENT } = mCore.enumerator.ui;

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

    _onBorderOver({ target }) {
        const index = extractBorderIndex(target.name);
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

    _onAnchorDrag({ data }) {
        if (!isLeftButton(data)) {
            return;
        }

        const anchor = geometry.pFixed(
            geometry.pCompDiv(
                this._toLocal(data.data.global),
                geometry.pFromSize(this.owner),
                true,
                true
            ),
            2,
            true
        );

        if (!this._selectedElement.userData.isRoot) {
            updateAnchor(this._selectedElement, anchor);
        } else {
            this._selectedElement.anchor.copyFrom(anchor);
        }

        this.owner.refreshAnchorElement();

        this._dispatchChangeWithCounter(anchor);

        this._updateTransform();
    }

    _getFormattedValue(value, format, data) {
        switch(format) {
        case VALUE_FORMAT.TEXTURE:
            return `texture_${value.id}`;
        case VALUE_FORMAT.PERCENT:
            return math.percentToFloat(value);
        case VALUE_FORMAT.DEGREE:
            return math.toRadians(value);
        case VALUE_FORMAT.COLOR:
            return color.hexToInt(value);
        case VALUE_FORMAT.POINT: {
            const result = { ...value };
            result.x = this._getFormattedValue(result.x, data[result.formatX]);
            result.y = this._getFormattedValue(result.y, data[result.formatY]);

            return result;
        }
        case VALUE_FORMAT.OBJECT:
            return value.title;
        default:
            return value;
        }
    }

    _onChangeTransform({ data: { key, value, type, format, location, data } }) {
        this._changeKey = key;
        const changeValue = this._getFormattedValue(value, format, data);

        switch (location) {
        case PROPERTY_LOCATION.ROOT:
            this._selectedElement[key] = changeValue;
            break;
        case PROPERTY_LOCATION.USER_DATA:
            this._selectedElement.userData[key] = changeValue;
            break;
        case PROPERTY_LOCATION.LAYOUT:
            const layoutComponent = this._selectedElement.componentManager.getComponent(mCore.constant.COM_UI_LAYOUT_NAME);

            const { userData } = this._selectedElement;
            const directionCount = MARGIN_DIRECTION.length;

            userData[key] = changeValue;
            layoutComponent[key] = changeValue;

            layoutComponent.isStretchWidth = userData.marginLeftEnabled && userData.marginRightEnabled;
            layoutComponent.horizontalEdge = getHorizontalEdge(userData);

            layoutComponent.isStretchHeight = userData.marginTopEnabled && userData.marginBottomEnabled;
            layoutComponent.verticalEdge = getVerticalEdge(userData);

            for(let i = 0; i < directionCount; ++i) {
                updateMargin(layoutComponent, userData, MARGIN_DIRECTION[i]);
            }

            break;
        default:
        }

        this._selectedElement.doLayout();
        this._updateTransform();

        this._dispatchResultChange(changeValue);
    }

    _onAnchorDragStart() {
        this._changeKey = STAGE_ELEMENT_PROP.ANCHOR;
    }

    _onAnchorDragFinish() {
        geometry.pRound(this._selectedElement.position, true);
        this._updateTransform();
        this._dispatchResultChange(this._selectedElement.anchor);
    }

    _onElementClick({ target, data }) {
        if (!isLeftButton(data)) {
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

    _onBorderDragStart({ data }) {
        if (this._editMode !== EDIT_MODE.SKEW) {
            return;
        }

        this._beginElementAngle = this._selectedElement.rotation;

        this._globalStart.copyFrom(data.data.global);

        const ownerPos = this.owner.parent.toGlobal(this.owner.position);
        const offset = geometry.pSub(data.data.global, ownerPos, true);

        this._beginEditAngle = Math.atan2(offset.y, offset.x);
    }

    _onBorderDragFinish() {
        this._beginEditAngle = 0;
        this._beginElementAngle = 0;
    }

    _onBorderDrag({ data, target }) {
        if (!isLeftButton(data)) {
            return;
        }

        const index = extractBorderIndex(target.name);

        let changeValue;

        switch (this._editMode) {
        case EDIT_MODE.SIZE: {
            const nextSize = this._calculateNextSize(data.data.global, index, true);

            this._refreshTransform();

            const elementWorldScale = this._getElementWorldScale();

            geometry.pRound(geometry.pCompDiv(nextSize, elementWorldScale, true), true);

            this._selectedElement.width = nextSize.x;
            this._selectedElement.height = nextSize.y;

            nextSize.destroy();
            elementWorldScale.destroy();

            this._changeKey = STAGE_ELEMENT_PROP.SIZE;
            changeValue = this._selectedElement.rate;
            break;
        }
        case EDIT_MODE.SKEW: {
            if (index.x === index.y || math.abs(index.y - index.x) === 2) {
                this._changeKey = STAGE_ELEMENT_PROP.ROTATION;
                const ownerPos = this.owner.parent.toGlobal(this.owner.position);
                const offset = geometry.pSub(data.data.global, ownerPos, true);
                const rotation = this._beginElementAngle + Math.atan2(offset.y, offset.x) - this._beginEditAngle;

                this._selectedElement.rotation = this._selectedElement.parent.worldTransform.c + rotation;

                changeValue = this._selectedElement.rotation;
            } else {
                index.x = index.x - 1;
                index.y = 1 - index.y;

                const startPos = this._toLocal(this._globalStart);
                const endPos = this._toLocal(data.data.global);
                const invertedIndex = mCore.geometry.Point.create(index.y, index.x);
                const offset = geometry.pRound(
                    geometry.pCompMult(
                        geometry.pSub(
                            endPos,
                            startPos,
                            true
                        ),
                        invertedIndex,
                        true,
                        true
                    ),
                    true
                );

                if (index.y === 0) {
                    this._selectedElement.skew.y = math.toFixed(
                        Math.atan2(offset.y, math.divPowTwo(this._selectedElement.width))
                    );
                } else {
                    this._selectedElement.skew.x = math.toFixed(
                        Math.atan2(math.divPowTwo(this._selectedElement.height), offset.x) - Math.PI / 2
                    );
                }

                this._changeKey = STAGE_ELEMENT_PROP.SKEW;
                changeValue = this._selectedElement.skew;
            }
            break;
        }
        default: {
            const nextSize = this._calculateNextSize(data.data.global, index, false);

            this._refreshTransform();

            this._selectedElement.scale.copyFrom(
                geometry.pCompDiv(
                    nextSize,
                    geometry.pCompMult(
                        geometry.pFromSize(this._selectedElement),
                        geometry.pCompDiv(
                            this._getElementWorldScale(),
                            this._selectedElement.scale,
                            true
                        ),
                        true,
                        true
                    ),
                    true,
                    true
                )
            );

            nextSize.destroy();

            this._changeKey = STAGE_ELEMENT_PROP.SCALE;
            changeValue = this._selectedElement.scale;
            break;
        }
        }
        this._updateTransform();
        this._dispatchChangeWithCounter(changeValue);
    }

    _calculateNextSize(globalPos, index, isMaximize) {
        const localPos = this._toLocal(globalPos);
        const result =  mCore.geometry.Point.create(
            this._calculateDimension(localPos, index, 'x'),
            this._calculateDimension(localPos, index, 'y')
        );

        return isMaximize ? geometry.pMax(result, this._minSize, true) : result;
    }

    _calculateDimension(localPos, index, cord) {
        switch (index[cord]) {
        case 0: {
            return math.round(this.owner.rate[cord] - localPos[cord]);
        }
        case 1: {
            return math.round(this.owner.rate[cord]);
        }
        default: {
            return math.round(localPos[cord]);
        }
        }
    }

    _canDrag(data) {
        return isLeftButton(data) && !this._selectedElement.userData.isRoot;
    }

    _onPositionDragStart({ data }) {
        if (!this._canDrag(data)) {
            return;
        }
        this._canvas.style.cursor = CURSOR.MOVE;
        this._dragPosition.copyFrom(data.data.global);
        this._changeKey = STAGE_ELEMENT_PROP.POSITION;
    }

    _onPositionDragMove({ data }) {
        if (!this._canDrag(data)) {
            return;
        }
        const nextPos = data.data.global;

        updatePosition(this.owner, this._dragPosition, nextPos);
        updatePosition(this._selectedElement, this._dragPosition, nextPos);

        this._dragPosition.copyFrom(nextPos);

        this._dispatchChangeWithCounter(this._selectedElement.position);
    }

    _onPositionDragFinish({ data }) {
        if (!this._canDrag(data)) {
            return;
        }
        geometry.pRound(this._selectedElement.position, true);
        this._updateTransform();
        this._canvas.style.cursor = CURSOR.AUTO;
        this._dragPosition.set(0, 0);
        this._dispatchResultChange(this._selectedElement.position);
    }


    _dispatchChangeWithCounter(value) {
        ++this._changeCounter;

        if (this._changeCounter > 3) {
            this._dispatchChange(value);
        }
    }

    _dispatchResultChange(value) {
        this._dispatchChange(value);
        this._changeKey = null;
    }

    _dispatchChange(value) {
        this._changeCounter = 0;
        const resultValue = mCore.util.type.isObject(value) ? generatePoint(value.x, value.y) : value;

        const result = [generateProp(this._changeKey, resultValue)];

        switch (this._changeKey) {
        case STAGE_ELEMENT_PROP.TEXT_OUTLINE_ENABLED: {
            if (!resultValue) {
                result.push(
                    generateProp(STAGE_ELEMENT_PROP.TEXT_OUTLINE_SIZE, 0),
                    generateProp(STAGE_ELEMENT_PROP.TEXT_OUTLINE_COLOR, mCore.util.color.COLORS.WHITE)
                );
            }
            break;
        }
        case STAGE_ELEMENT_PROP.TEXT_SHADOW_ENABLED: {
            if (!resultValue) {
                result.push(
                    generateProp(STAGE_ELEMENT_PROP.TEXT_SHADOW_SIZE, generatePoint(0, 0)),
                    generateProp(STAGE_ELEMENT_PROP.TEXT_SHADOW_COLOR, mCore.util.color.COLORS.WHITE)
                );
            }
            break;
        }
        case STAGE_ELEMENT_PROP.ANCHOR: {
            result.push(
                generateProp(
                    STAGE_ELEMENT_PROP.POSITION,
                    generatePoint(this._selectedElement.x, this._selectedElement.y)
                ),
            );
            break;
        }
        case STAGE_ELEMENT_PROP.MARGIN_LEFT:
        case STAGE_ELEMENT_PROP.MARGIN_RIGHT:
        case STAGE_ELEMENT_PROP.MARGIN_BOTTOM:
        case STAGE_ELEMENT_PROP.MARGIN_TOP:
        case STAGE_ELEMENT_PROP.MARGIN_TOP_ENABLED:
        case STAGE_ELEMENT_PROP.MARGIN_BOTTOM_ENABLED:
        case STAGE_ELEMENT_PROP.MARGIN_RIGHT_ENABLED:
        case STAGE_ELEMENT_PROP.MARGIN_LEFT_ENABLED: {
            result.push(
                generateProp(
                    STAGE_ELEMENT_PROP.POSITION,
                    generatePoint(this._selectedElement.x, this._selectedElement.y)
                ),
                generateProp(
                    STAGE_ELEMENT_PROP.SIZE,
                    generatePoint(this._selectedElement.width, this._selectedElement.height)
                )
            );
            break;
        }
        default:
        }

        this.listenerManager.dispatchEvent(EVENT.ELEMENT_CHANGE, result);
    }

    _setSelectedElementListeners(
        eventDragStart = null,
        eventDrag = null,
        eventDragFinish = null
    ) {
        const manager = this._selectedElement.interactionManager;
        manager.eventDragStart = eventDragStart;
        manager.eventDrag = eventDrag;
        manager.eventDragFinish = eventDragFinish;
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

    _updateTransform() {
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

        const pointToCheck = this._zeroPositionTypes.includes(this._selectedElement.uiType)
            ? this._zeroPoint
            : getAnchorPosition(this._selectedElement);

        this.owner.position.copyFrom(this._toParentCoords(this._selectedElement.toGlobal(pointToCheck)));
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

        if (this._selectedElement === null) {
            this.owner.visible = false;
            return;
        }

        this.listenerManager.dispatchEvent(EVENT.ELEMENT_SELECT, this._selectedElement);

        this.owner.visible = true;

        this._setSelectedElementListeners(
            this._positionDragStartEvent,
            this._positionDragMoveEvent,
            this._positionDragFinishEvent
        );

        this._updateTransform();
    }
}
