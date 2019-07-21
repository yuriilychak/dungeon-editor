import { EditScene } from "./edit-scene";
import { EVENT } from "./enumerator";

const { mCore } = window;

export default {

    /**
     * @type {EditScene}
     * @private
     */

    _editScene: null,

    /**
     * @type {?Function}
     * @private
     */

    _zoomCallback: null,

    /**
     * @function
     * @public
     * @param {HTMLCanvasElement} view
     */

    init(view) {
        setTimeout(() => {
            mCore.macro.MOUSE_WHEEL_ENABLED = true;
            mCore.launcher.initApp({
                view,
                width: view.width,
                height: view.height,
                backgroundColor: 0x181818,
                resolution: window.devicePixelRatio || 1,
            }, 800, 600, () => {
                mCore.launcher.app.loader
                    .add('static/assets/defaultAssets.json')
                    .load(() => {
                        this._editScene = EditScene.create();
                        this._editScene.zoomCallback = this._zoomCallback;
                        mCore.launcher.runScene(this._editScene);

                        this._onWindowResize();
                        window.addEventListener("resize", this._onWindowResize.bind(this));
                        this._addListener(EVENT.ZOOM_CHANGE, this._onZoomChange);
                    });
            });

        }, 500);
    },

    _addListener(event, callback) {
        mCore.eventDispatcher.addListener(event, callback, this);
    },

    _onWindowResize() {
        const { view } = window.mCore.launcher.app;
        const { offsetWidth, offsetHeight } = view.parentNode;
        mCore.launcher.resize(offsetWidth, offsetHeight, true);
    },

    _onZoomChange({ data }) {
        this._zoomCallback(data);
    },

    setZoom(value = 1) {
        mCore.eventDispatcher.dispatch(EVENT.ZOOM_CHANGE, this, value);
    },

    resetPosition() {
        mCore.eventDispatcher.dispatch(EVENT.RESET_POSITION, this);
    },

    setZoomCallback(callback) {
        this._zoomCallback = callback;
    }
}
