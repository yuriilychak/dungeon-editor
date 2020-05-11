import { EVENT } from "../enum";
import { SECTION_ID } from "../../enum";
import { DEFAULT_ANCHOR  } from "../constants";
import { createElement } from "../utils";
import { EditArea } from "../view";
import ComElementTransform from "./com-element-transform";

const { mCore } = window;
const { view } = mCore;

export default class ComStageGrid extends mCore.component.ui.ComUI {
    constructor() {
        super("ComStageView");

        this._root = null;

        /**
         * @type {EditArea}
         * @private
         */

        this._editArea = EditArea.create();

        /**
         * @type {mCore.view.ComponentContainer}
         * @private
         */

        this._viewElement = mCore.view.ComponentContainer.create();

        /**
         * @type {mCore.view.ComponentContainer || mCore.view.ComponentSprite}
         * @private
         */

        this._crtElement = null;

        /**
         * @type {mCore.repository.Repository}
         * @private
         */
        this._uiElements = new mCore.repository.Repository();

        /**
         * @type {ComElementTransform}
         * @private
         */

        this._comElementTransform = ComElementTransform.create();

        this._sectionPrefixes = {
            [SECTION_ID.TEXTURE]: "texture",
            [SECTION_ID.ELEMENT]: "ui_element",
            [SECTION_ID.TILE_MAP]: "tile_map"
        };

        this._editArea.componentManager.addComponent(this._comElementTransform);
    }

    onAdd(owner) {
        super.onAdd(owner);

        this._root = this.getChildView("view");

        this._root.addChild(this._viewElement);
        this._root.addChild(this._editArea);

        this.listenerManager.addEventListener(EVENT.CREATE_UI_ELEMENT, this._onCreateUIElement);
        this.listenerManager.addEventListener(EVENT.CREATE_ELEMENT, this._onCreateElement);
        this.listenerManager.addEventListener(EVENT.ZOOM_CHANGE, this._onZoomChange);
        this.listenerManager.addEventListener(EVENT.OFFSET_CHANGE, this._onOffsetChange);
        this.listenerManager.addEventListener(EVENT.SHOW_ELEMENT, this._onShowElement);
        this.listenerManager.addEventListener(EVENT.DELETE_ELEMENTS, this._onDeleteElements);
        this.listenerManager.addEventListener(EVENT.ELEMENT_CLEAR_SELECTION, this._onClearSelection);
    }

    _onCreateElement({ data }) {
        const { type } = data;
        const element = createElement(type);

        element.interactive = true;
        element.interactionManager.eventClick = EVENT.ELEMENT_CLICK;

        element.position.copyFrom(mCore.util.geometry.pRound(this._crtElement.toLocal(data), true));

        this._crtElement.addChild(element);

        this._comElementTransform.selectedElement = element;
    }

    _onClearSelection() {
        this._comElementTransform.selectedElement = null;
    }

    _onCreateUIElement({ data }) {
        const { id, type } = data;
        const element = createElement(type, true);

        element.name = "root";
        element.interactive = true;
        element.interactionManager.eventClick = EVENT.ELEMENT_CLICK;

        this._addElement(element, `${this._sectionPrefixes[SECTION_ID.ELEMENT]}_${id}`);
        this._showElement(element);

        this._comElementTransform.selectedElement = element;
    }

    _onDeleteElements({ data }) {
        console.log(data);
    }

    _onShowElement({ data }) {
        const { id, type } = data;
        const key = `${this._sectionPrefixes[type]}_${id}`;
        let element;

        switch (type) {
        case SECTION_ID.TEXTURE: {
            if (this._uiElements.hasElement(key)) {
                element = this._uiElements.getElement(key);
            }
            else {
                element = view.ComponentSprite.create(key);
                this._addElement(element, key);
            }

            this._showElement(element);
            this._comElementTransform.selectedElement = null;

            break;
        }
        case SECTION_ID.ELEMENT: {
            element = this._uiElements.getElement(key);
            this._comElementTransform.selectedElement = null;
            break;
        }
        default: {
            break;
        }
        }

        if (element) {
            this._showElement(element);
        }
    }

    _addElement(element, key) {
        element.anchor.set(DEFAULT_ANCHOR);
        this._uiElements.addElement(element, key);
        this._viewElement.addChild(element);
    }

    _showElement(element) {
        if (this._crtElement === element) {
            return;
        }

        if (this._crtElement !== null) {
            this._crtElement.visible = false;
        }

        this._crtElement = element;
        element.visible = true;
    }

    _onZoomChange({ data }) {
        this._editArea.changeScale(data);
        this._root.scale.set(data);
    }

    _onOffsetChange({ data }) {
        this._root.position.copyFrom(data);
    }
};
