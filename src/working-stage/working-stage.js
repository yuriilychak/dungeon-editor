import { EditScene } from "./edit-scene";

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
            window.mCore.macro.MOUSE_WHEEL_ENABLED = true;
            window.mCore.launcher.initApp({
                view,
                width: view.width,
                height: view.height,
                backgroundColor: 0x181818,
                resolution: window.devicePixelRatio || 1,
            }, 800, 600, () => {
                window.mCore.launcher.app.loader
                    .add('static/assets/defaultAssets.json')
                    .load(() => {
                        this._editScene = EditScene.create();
                        this._editScene.zoomCallback = this._zoomCallback;
                        window.mCore.launcher.runScene(this._editScene);

                        this._onWindowResize();
                        window.addEventListener("resize", this._onWindowResize.bind(this));
                    });
            });

        }, 500);
    },

    _onWindowResize() {
        const { view } = window.mCore.launcher.app;
        const { offsetWidth, offsetHeight } = view.parentNode;
        window.mCore.launcher.resize(offsetWidth, offsetHeight, true);
    },

    setZoom(value = 1) {
        if (this._editScene === null) {
            return;
        }
        this._editScene.zoom = value;
    },

    setZoomCallback(callback) {
        this._zoomCallback = callback;
        if (this._editScene === null) {
            return;
        }
        this._editScene.zoomCallback = this._zoomCallback;
    }
}
