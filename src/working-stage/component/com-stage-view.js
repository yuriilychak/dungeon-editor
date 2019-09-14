import { EVENT } from "../enum";

const { mCore, PIXI } = window;
const { view } = mCore;
const { math, geometry } = mCore.util;
const { NUMBER_TYPE, ui } =  mCore.enumerator;

export default class ComStageGrid extends mCore.component.ui.ComUI {
    constructor() {
        super("ComStageView");

        this._root = null;
        /**
         * @type {mCore.repository.Repository}
         * @private
         */
        this._uiElements = new mCore.repository.Repository();
    }

    onAdd(owner) {
        super.onAdd(owner);

        this._root = this.getChildView("view");

        this.listenerManager.addEventListener(EVENT.CREATE_UI_ELEMENT, this._onCreateUIElement);
        this.listenerManager.addEventListener(EVENT.ZOOM_CHANGE, this._onZoomChange);
        this.listenerManager.addEventListener(EVENT.OFFSET_CHANGE, this._onOffsetChange);
    }

    _onCreateUIElement({ data }) {
        const { id, type, name } = data;

        let element;

        switch(type) {
            case ui.UI_ELEMENT.WIDGET: {
                element = mCore.ui.Widget.create();
                element.width = 200;
                element.height = 200;
                break;
            }
            case ui.UI_ELEMENT.BUTTON: {
                /**
                 * @type {mCore.ui.Button}
                 */
                element = mCore.ui.Button.create("default_roundRect_up", "default_roundRect_down", "default_roundRect_over", "default_roundRect_disabled");
                element.setSlice(6, 6, 6, 6);
                element.width = 80;
                element.height = 40;
                element.anchor.set(0.5);
                element.title = mCore.ui.Label.create("EmptyFont", 16);
                element.title.width = 80;
                element.title.height = 40;
                element.titleText = "Button";
                element.title.color = 0x000000;
                element.title.anchor.set(0.5);
                element.title.horizontalAlign = window.mCore.enumerator.ui.HORIZONTAL_ALIGN.CENTER;
                element.title.verticalAlign = window.mCore.enumerator.ui.VERTICAL_ALIGN.MIDDLE;
                element.title.position.set(40, 20);
                break;
            }
            default:
                element = mCore.view.ComponentContainer.create();
        }
        element.name = name;

        this._uiElements.addElement(element, id);

        this._root.addChild(element);
    }

    _onZoomChange({ data }) {
        this._root.scale.set(data);
    }

    _onOffsetChange({ data }) {
        this._root.position.copyFrom(data);
    }
};
