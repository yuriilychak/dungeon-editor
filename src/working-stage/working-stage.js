import { EditScene } from "./edit-scene";

export default {

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
                        window.mCore.launcher.runScene(EditScene.create());

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
    }
}
