import {EditScene} from "./edit-scene";
import {EVENT} from "./enum";

const {mCore} = window;

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
     * @type {boolean}
     * @private
     */

    _isDrag: false,

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
                resolution: 1
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

    showElement(type, id) {
        this._dispatch(EVENT.SHOW_ELEMENT, { type, id });
    },

    createUIElement(type, id, name) {
        this._dispatch(EVENT.CREATE_UI_ELEMENT, {type, id, name});
    },

    createElelement(type, x, y) {
        this._dispatch(EVENT.CREATE_ELEMENT, {type, x, y});
    },

    setZoom(value = 1) {
        this._dispatch(EVENT.ZOOM_SET, value);
    },

    resetPosition() {
        this._dispatch(EVENT.RESET_POSITION);
    },

    setZoomCallback(callback) {
        this._zoomCallback = callback;
    },

    setChangeModeCallback(callback) {
        this._addListener(EVENT.EDIT_MODE_CHANGE_INSIDE, callback);
    },

    dispatchDragStart(event) {
        this._isDrag = true;
        this._dispatch(EVENT.DRAG_START, event);
    },

    dispatchDragMove(event) {
        if (this._isDrag) {
            this._dispatch(EVENT.DRAG_MOVE, event);
        }
    },

    dispatchDragEnd(event) {
        if (this._isDrag) {
            this._isDrag = false;
            this._dispatch(EVENT.DRAG_END, event);
        }
    },

    dispatchDelete(type, fileIds) {
        this._dispatch(EVENT.DELETE_ELEMENTS, { type, fileIds });
    },

    dispatchEditModeChange() {
        this._dispatch(EVENT.EDIT_MODE_CHANGE_OUTSIDE);
    },

    _addListener(event, callback) {
        mCore.eventDispatcher.addListener(event, callback, this);
    },

    _dispatch(type, data = null) {
        mCore.eventDispatcher.dispatch(type, this, data);
    },

    _onWindowResize() {
        const {view} = window.mCore.launcher.app;
        const {offsetWidth, offsetHeight} = view.parentNode;
        mCore.launcher.resize(offsetWidth, offsetHeight, true);
    },

    _onZoomChange({data}) {
        this._zoomCallback(data);
    }
}
