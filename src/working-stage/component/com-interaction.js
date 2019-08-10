import { EVENT } from "../enumerator";

const { mCore } = window;
const { math, geometry } = mCore.util;
const { NUMBER_TYPE } =  mCore.enumerator;


export default class ComInteraction extends mCore.component.ui.ComUI {
    constructor() {
        super('ComInteraction');

        /**
         * @type {number}
         * @private
         */

        this._zoom = 1;

        /**
         * @type {number}
         * @private
         */

        this._minZoom = 0.25;

        /**
         * @type {number}
         * @private
         */

        this._maxZoom = 4;

        /**
         * @type {number}
         * @private
         */

        this._zoomItencity = 0.05;

        /**
         * @type {?mCore.ui.Widget}
         * @private
         */

        this._workingLayer = null;

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._dragPosition = mCore.geometry.Point.create();

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._screenOffset = mCore.geometry.Point.create(0, 0, NUMBER_TYPE.INT_32);

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._offset = mCore.geometry.Point.create();

        this._offset.initChangeCallback(this._onOffsetChange, this);
        this.listenInteractions = true;
    }

    onAdd(owner) {
        super.onAdd(owner);

        const { INTERACTIVE_EVENT } = mCore.enumerator.ui;
        const { SYSTEM_EVENT } = mCore.enumerator.event;

        this._workingLayer = this.getChildView("interaction");
        this._workingLayer.interactive = true;
        this._workingLayer.anchor.set(0.5);
        this._workingLayer.interactionManager.interactive = true;
        this._workingLayer.position.set(0, 0);

        this.listenerManager.addEventListener(SYSTEM_EVENT.RESIZE, this._onResize);
        this.listenerManager.addEventListener(SYSTEM_EVENT.WHEEL, this._onWheel);
        this.listenerManager.addEventListener(EVENT.ZOOM_SET, this._onZoomSet);
        this.listenerManager.addEventListener(EVENT.RESET_POSITION, this._onResetPosition);

        this.addChildListener(this._onDragStart, INTERACTIVE_EVENT.DRAG_START, "interaction");
        this.addChildListener(this._onDragMove, INTERACTIVE_EVENT.DRAG, "interaction");
        this.addChildListener(this._onDragFinish, INTERACTIVE_EVENT.DRAG_FINIS, "interaction");

        this._refreshInteractionArea();
    }

    _updateZoom(zoom, stageX = 0, stageY = 0) {
        const zoomCoef = 1 - zoom / this._zoom;
        this._offset.x += (stageX - this._offset.x) * zoomCoef;
        this._offset.y += (stageY - this._offset.y) * zoomCoef;

        this._zoom = zoom;

        this.listenerManager.dispatchEvent(EVENT.ZOOM_CHANGE, zoom);
    }


    _refreshInteractionArea() {
        const size = geometry.pFromSize(mCore.launcher.app.view);

        this._workingLayer.width = size.x;
        this._workingLayer.height = size.y;

        this._screenOffset.copyFrom(geometry.pMult(size, 0.5, true));
        this.owner.position.copyFrom(this._screenOffset);
    }

    _onResize() {
        this._refreshInteractionArea();
    }

    _onWheel(event) {
        const { data } = event;
        const { deltaY, offsetX, offsetY } = data;

        const zoomDelta = Math.exp(-math.sign(deltaY) * this._zoomItencity);
        const zoom = math.range(math.toFixed(this._zoom * zoomDelta), this._minZoom, this._maxZoom);

        this._updateZoom(zoom, offsetX - this._screenOffset.x, offsetY - this._screenOffset.y);
    }

    _onZoomSet({ data }) {
        this._updateZoom(data);
    }

    _onResetPosition() {
        this._offset.set(0, 0);
    }

    _onDragStart({ data }) {
        this._dragPosition.copyFrom(data.data.global);
    }

    _onDragMove({ data }) {

        geometry.pAdd(this._offset, geometry.pSub(data.data.global, this._dragPosition), true);
        this._dragPosition.copyFrom(data.data.global);
    }

    _onDragFinish() {
        this._dragPosition.set(0, 0);
        geometry.pRound(this._offset, true);
    }

    _onOffsetChange() {
        this.listenerManager.dispatchEvent(EVENT.OFFSET_CHANGE, this._offset);
    }
}
