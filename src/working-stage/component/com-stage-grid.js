import { EVENT } from "../enum";

const { mCore, PIXI } = window;
const { math, geometry } = mCore.util;
const { NUMBER_TYPE } =  mCore.enumerator;

function calculateOffset(size, cellSize) {
    return Math.round(((size / cellSize) % 1) * cellSize);
}

export default class ComStageGrid extends mCore.component.ui.ComUI {
    /**
     * @constructor
     */
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

        this._offset = mCore.geometry.Point.create(0, 0);

        /**
         * @type {?mCore.ui.Widget}
         * @private
         */

        this._workingLayer = null;
    }

    onAdd(owner) {
        super.onAdd(owner);

        const { width, height } = mCore.launcher.app.screen;
        const { SYSTEM_EVENT } = mCore.enumerator.event;


        this._workingLayer = this.getChildView("grid");

        const backgroundTexture = PIXI.Texture.from("default_background");
        backgroundTexture.baseTexture.mipmap = false;

        this._background = new PIXI.TilingSprite(backgroundTexture, width, height);

        this._workingLayer.addChild(this._background);

        this._backSize = backgroundTexture.width;
        this._screenOffset.set(math.divPowTwo(width), math.divPowTwo(height));
        this._cordX = this._createCord(width, this._cordSize);
        this._cordY = this._createCord(this._cordSize, height);

        this.listenerManager.addEventListener(SYSTEM_EVENT.RESIZE, this._onResize);
        this.listenerManager.addEventListener(EVENT.ZOOM_CHANGE, this._onZoomChange);
        this.listenerManager.addEventListener(EVENT.OFFSET_CHANGE, this._onOffsetChane);
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
        result.anchor.set(0.5);
        result.width = width;
        result.height = height;
        result.position.copyFrom(this._screenOffset);
        this.owner.addChildAt(result, 2);

        return result;
    }

    /**
     * @method
     * @private
     */

    _onResize() {
        const { width, height } = mCore.launcher.app.view;

        this._background.width = width;
        this._background.height = height;

        this._screenOffset.set(
            math.divPowTwo(width),
            math.divPowTwo(height)
        );

        this._background.position.copyFrom(geometry.pNeg(this._screenOffset));

        this._cordX.width = width;
        this._cordY.height = height;

        this._recalculatePosition();
    }

    /**
     * @method
     * @param {mCore.eventDispatcher.EventModel} data
     * @private
     */

    _onZoomChange({ data }) {
        this._zoom = data;
        this._background.tileScale.set(this._zoom);

        this._recalculatePosition();
    }

    /**
     * @method
     * @param {mCore.eventDispatcher.EventModel} data
     * @private
     */

    _onOffsetChane({ data }) {
        this._offset.copyFrom(data);
        this._recalculatePosition();
    }

    /**
     * @method
     * @private
     */

    _recalculatePosition() {
        const cellSize = this._backSize * this._zoom;
        this._background.tilePosition.set(
            calculateOffset(this._screenOffset.x + this._offset.x, cellSize),
            calculateOffset(this._screenOffset.y + this._offset.y, cellSize)
        );
        this._cordX.x = 0;
        this._cordX.y = this._offset.y;
        this._cordY.y = 0;
        this._cordY.x = this._offset.x;
    }
}
