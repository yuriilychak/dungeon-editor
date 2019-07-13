const { PIXI, mCore } = window;
const { math } = mCore.util;

function calculateOffset(size, cellSize) {
    return Math.round(((size / cellSize) % 1) * cellSize);
}

export default class StageGrid extends mCore.view.ComponentContainer {
    constructor() {
        super();

        const { width, height } = mCore.launcher.app.screen;
        const { SYSTEM_EVENT } = mCore.enumerator.event;

        const backgroundTexture = PIXI.Texture.from('default_background');
        backgroundTexture.baseTexture.mipmap = false;

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

        this._backSize = backgroundTexture.width;

        /**
         * @type {mCore.geometry.Point}
         * @private
         */

        this._screenOffset = mCore.geometry.Point.create(
            math.divPowTwo(width),
            math.divPowTwo(height),
            mCore.enumerator.NUMBER_TYPE.INT_32
        );

        /**
         * @type {number}
         * @private
         */

        this._zoom = 1;

        /**
         * @type {PIXI.TilingSprite}
         * @private
         */

        this._background = new PIXI.TilingSprite(backgroundTexture, width, height);


        this.addChild(this._background);

        /**
         * @type {mCore.view.ComponentSprite}
         * @private
         */

        this._cordX = this._createCord(width, this._cordSize);

        /**
         * @type {mCore.view.ComponentSprite}
         * @private
         */

        this._cordY = this._createCord(this._cordSize, height);

        this.listenerManager.addEventListener(SYSTEM_EVENT.RESIZE, this._onResize);
        this.listenerManager.addEventListener(SYSTEM_EVENT.WHEEL, this._onWheel);
    }

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
        const result = mCore.view.ComponentSprite.create('default_simpleRect');
        result.tint = 0x000000;
        result.anchor.set(0.5, 0.5);
        this._refreshCordTransform(result, width, height);
        this.addChild(result);

        return result;
    }

    _onWheel(event) {

        const offset = this._zoom - event.data.deltaY / this._wheelThreshold;


        if (event.data.deltaY < 0) {
            this._zoom = Math.min(offset, 4);
        }
        else {
            this._zoom = Math.max(offset, 0.25);
        }

        this._refreshBackPos();

        this._background.tileScale.set(this._zoom, this._zoom);
    }

    _onResize() {
        const { width, height } = mCore.launcher.app.view;

        this._background.width = width;
        this._background.height = height;

        this._screenOffset.set(
            math.divPowTwo(width),
            math.divPowTwo(height)
        );

        this._refreshBackPos();
        this._refreshCordTransform(this._cordX, width, this._cordSize);
        this._refreshCordTransform(this._cordY, this._cordSize, height);
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
            calculateOffset(this._screenOffset.x, cellSize),
            calculateOffset(this._screenOffset.y, cellSize)
        );
    }
}
