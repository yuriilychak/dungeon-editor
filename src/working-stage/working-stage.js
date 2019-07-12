export default {

    /**
     * @function
     * @public
     * @param {HTMLCanvasElement} view
     */

    init(view) {
        setTimeout(() => {
            window.mCore.launcher.initApp({
                view,
                width: view.width,
                height: view.height,
                backgroundColor: 0xFF0000,
                resolution: window.devicePixelRatio || 1,
            }, 800, 600, () => {
                this._onWindowResize();
                window.addEventListener("resize", this._onWindowResize.bind(this));
            });

        }, 500);
    },

    _onWindowResize() {
        const { view } = window.mCore.launcher.app;
        const { offsetWidth, offsetHeight } = view.parentNode;
        window.mCore.launcher.resize(offsetWidth, offsetHeight, true);
    },

    /*_createAlignGrid() {
        const { view } = this._app;
        const width = Math.ceil(view.width / 50);
        const height = Math.ceil(view.height / 50);
        const graphics = new window.PIXI.Graphics();
        // Rectangle
        graphics.lineStyle(1, 0x595a5f, 1);
        for (let i = 0; i < width; ++i) {
            for (let j = 0; j < height; ++j) {
                graphics.drawRect(i * 50, j * 50, 50, 50);
            }
        }


        this._app.stage.addChild(graphics);
    }*/
}
