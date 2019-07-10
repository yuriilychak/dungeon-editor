export default {

    /**
     * @type {PIXI.Application}
     * @private
     */
    _app: null,

    /**
     * @function
     * @public
     * @param {HTMLCanvasElement} view
     */

    init(view) {
        setTimeout(() => {
            this._app = new window.PIXI.Application({
                view,
                width: view.width,
                height: view.height,
                backgroundColor: 0x181818,
                resolution: window.devicePixelRatio || 1
            });
            this._onWindowResize();
            window.addEventListener("resize", this._onWindowResize.bind(this));
        }, 500);
    },

    _onWindowResize() {
        const { view, renderer } = this._app;
        const { offsetWidth, offsetHeight } = view.parentNode;

        renderer.resize(offsetWidth, offsetHeight);
        view.width = offsetWidth;
        view.height = offsetHeight;

    }
}
