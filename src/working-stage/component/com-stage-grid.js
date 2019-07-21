import { EVENT } from "../enumerator";

const { mCore, PIXI } = window;
const { math } = mCore.util;
const { NUMBER_TYPE } =  mCore.enumerator;

function calculateOffset(size, cellSize) {
    return Math.round(((size / cellSize) % 1) * cellSize);
}

export default class ComStageGrid extends mCore.component.ui.ComUI {
    constructor() {
        super("ComStageGrid");

        /**
         * @type {?PIXI.TilingSprite}
         * @private
         */

        this._background = null;

        /**
         * @type {number}
         * @private
         */

        this._cordSize = 2;

        /**
         * @type {number}
         * @private
         */

        this._wheelThreshold = 2000;

        /**
         * @type {number}
         * @private
         */

        this._backSize = 0;

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._screenOffset = mCore.geometry.Point.create(0, 0, NUMBER_TYPE.INT_32);

        /**
         * @type {number}
         * @private
         */

        this._zoom = 1;

        /**
         * @type {?mCore.view.ComponentSprite}
         * @private
         */

        this._cordX = null;

        /**
         * @type {?mCore.view.ComponentSprite}
         * @private
         */

        this._cordY = null;

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._dragPosition = mCore.geometry.Point.create(0, 0, NUMBER_TYPE.INT_32);

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._offset = mCore.geometry.Point.create(0, 0, NUMBER_TYPE.INT_32);

        this.listenInteractions = true;
    }

    onAdd(owner) {
        super.onAdd(owner);

        const { INTERACTIVE_EVENT } = mCore.enumerator.ui;
        const { width, height } = mCore.launcher.app.screen;
        const { SYSTEM_EVENT } = mCore.enumerator.event;

        const backgroundTexture = PIXI.Texture.from("default_background");
        backgroundTexture.baseTexture.mipmap = false;

        owner.interactive = true;
        owner.interactionManager.interactive = true;

        this._background = new PIXI.TilingSprite(backgroundTexture, width, height);

        owner.addChild(this._background);

        this._backSize = backgroundTexture.width;
        this._screenOffset.set(math.divPowTwo(width), math.divPowTwo(height));
        this._cordX = this._createCord(width, this._cordSize);
        this._cordY = this._createCord(this._cordSize, height);

        this._addInteractiveEvent(INTERACTIVE_EVENT.DRAG_START, this._onDragStart);
        this._addInteractiveEvent(INTERACTIVE_EVENT.DRAG, this._onDrag);
        this._addInteractiveEvent(INTERACTIVE_EVENT.DRAG_FINIS, this._onDragFinish);

        this.listenerManager.addEventListener(SYSTEM_EVENT.RESIZE, this._onResize);
        this.listenerManager.addEventListener(SYSTEM_EVENT.WHEEL, this._onWheel);
        this.listenerManager.addEventListener(EVENT.ZOOM_CHANGE, this._onZoomChange);
        this.listenerManager.addEventListener(EVENT.RESET_POSITION, this._onResetPosition);
    }

    /**
     * PRIVATE METHODS
     * -----------------------------------------------------------------------------------------------------------------
     */

    /**
     * @method
     * @param {number} width
     * @param {number} height
     * @returns {mCore.view.ComponentSprite|PIXI.Sprite}
     * @private
     */

    _createCord(width, height) {
        /**
         * @type {mCore.view.ComponentSprite | PIXI.Sprite}
         */
        const result = mCore.view.ComponentSprite.create("default_simpleRect");
        result.tint = 0x000000;
        result.anchor.set(0.5, 0.5);
        this._refreshCordTransform(result, width, height);
        this.owner.addChild(result);

        return result;
    }

    _addInteractiveEvent(eventId, callback) {
        const event = `${this.name}.INTERACTIVE_EVENT_${eventId}`;
        this.owner.interactionManager.updateInteractiveEvent(eventId, event);
        this.listenerManager.addEventListener(event, callback);
    }

    _onDragStart({ data }) {
        this._dragPosition.set(data.data.global.x, data.data.global.y);
    }

    _onDrag({ data }) {
        this._offset.x += Math.round(-(this._dragPosition.x - data.data.global.x));
        this._offset.y += Math.round(-(this._dragPosition.y - data.data.global.y));
        this._dragPosition.set(data.data.global.x, data.data.global.y);

        this._recalculatePosition();
    }

    _onDragFinish(event) {
        this._dragPosition.set(0, 0);
    }

    _onWheel(event) {
        const offset = mCore.util.math.round((this._zoom - event.data.deltaY / this._wheelThreshold) * 100) / 100;

        this.listenerManager.dispatchEvent(
            EVENT.ZOOM_CHANGE,
            event.data.deltaY < 0 ? Math.min(offset, 4) : Math.max(offset, 0.25)
        );
    }

    _onResize() {
        const { width, height } = mCore.launcher.app.view;

        this._background.width = width;
        this._background.height = height;

        this.width = width;
        this.height = height;

        this._screenOffset.set(
            math.divPowTwo(width),
            math.divPowTwo(height)
        );

        this._cordX.width = width;
        this._cordY.height = height;

        this._recalculatePosition();
    }

    _onResetPosition() {
        this._offset.set(0, 0);

        this._recalculatePosition();
    }

    _onZoomChange({ data }) {

        if (this._zoom === data) {
            return;
        }

        this._zoom = data;

        this._recalculatePosition();

        this._background.tileScale.set(this._zoom, this._zoom);
    }

    _recalculatePosition() {
        this._refreshBackPos();
        this._cordX.x = this._screenOffset.x;
        this._cordX.y = this._offset.y + this._screenOffset.y;
        this._cordY.y = this._screenOffset.y;
        this._cordY.x = this._offset.x + this._screenOffset.x;
    }

    /**
     * @method
     * @param {mCore.view.ComponentSprite} cord
     * @param {number} width
     * @param {number} height
     * @private
     */

    _refreshCordTransform(cord, width, height) {
        cord.width = width;
        cord.height = height;
        cord.x = this._screenOffset.x;
        cord.y = this._screenOffset.y;
    }

    _refreshBackPos() {
        const cellSize = this._backSize * this._zoom;
        this._background.tilePosition.set(
            calculateOffset(this._screenOffset.x + this._offset.x, cellSize),
            calculateOffset(this._screenOffset.y + this._offset.y, cellSize)
        );
    }
}
