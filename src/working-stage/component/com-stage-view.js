import {EVENT} from "../enum";
import {SECTION_ID} from "../../enum";

const {mCore} = window;
const {view, ui} = mCore;

export default class ComStageGrid extends mCore.component.ui.ComUI {
    constructor() {
        super("ComStageView");

        this._root = null;

        this._crtElement = null;

        /**
         * @type {mCore.repository.Repository}
         * @private
         */
        this._uiElements = new mCore.repository.Repository();

        this._defaultFontSize = 16;

        this._defaultSizes = {
            panel: {
                width: 320,
                height: 240
            },
            field: {
                width: 80,
                height: 40
            },
            progress: {
                width: 240,
                height: 18
            },
            checkbox: {
                width: 32,
                height: 32
            }
        };

        this._sectionPrefixes = {
            [SECTION_ID.TEXTURE]: "texture",
            [SECTION_ID.ELEMENT]: "ui_element",
            [SECTION_ID.TILE_MAP]: "tile_map"
        }
    }

    onAdd(owner) {
        super.onAdd(owner);

        this._root = this.getChildView("view");

        this.listenerManager.addEventListener(EVENT.CREATE_UI_ELEMENT, this._onCreateUIElement);
        this.listenerManager.addEventListener(EVENT.CREATE_ELEMENT, this._onCreateElement);
        this.listenerManager.addEventListener(EVENT.ZOOM_CHANGE, this._onZoomChange);
        this.listenerManager.addEventListener(EVENT.OFFSET_CHANGE, this._onOffsetChange);
        this.listenerManager.addEventListener(EVENT.SHOW_ELEMENT, this._onShowElement);
        this.listenerManager.addEventListener(EVENT.DELETE_ELEMENTS, this._onDeleteElements);
    }

    _onCreateElement({data}) {
        const {type, x, y} = data;
        const element = this._createElement(type);

        element.position.copyFrom(this._crtElement.toLocal({x, y}));

        this._crtElement.addChild(element);
    }

    _onCreateUIElement({data}) {
        const {id, type, name} = data;
        const element = this._createElement(type);

        element.name = name;

        this._addElement(element, `${this._sectionPrefixes[SECTION_ID.ELEMENT]}_${id}`);
        this._showElement(element);
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
                break;
            }
            case SECTION_ID.ELEMENT: {
                element = this._uiElements.getElement(key);
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
        element.anchor.set(0.5);
        this._uiElements.addElement(element, key);
        this._root.addChild(element);
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

    _createElement(type) {
        let element;

        const {UI_ELEMENT, PANEL_GRAPHIC_TYPE, PROGRESS_TYPE } = mCore.enumerator.ui;

        switch (type) {
            case UI_ELEMENT.WIDGET: {
                element = ui.Widget.create();
                element.width = this._defaultSizes.panel.width;
                element.height = this._defaultSizes.panel.height;
                return element;
            }
            case UI_ELEMENT.BUTTON: {
                /**
                 * @type {mCore.ui.Button}
                 */
                element = ui.Button.create(
                    "default_roundRect_up",
                    "default_roundRect_down",
                    "default_roundRect_over",
                    "default_roundRect_disabled"
                );
                this._setSizing(element, this._defaultSizes.field, true);
                element.title = this._createDefaultLabel("Button");
                element.title.position.set(this._defaultSizes.field.width * 0.5, this._defaultSizes.field.height * 0.5);
                return element;
            }
            case UI_ELEMENT.PANEL: {
                element = ui.Panel.create(PANEL_GRAPHIC_TYPE.SPRITE, "default_roundRect_over");
                this._setSizing(element, this._defaultSizes.panel, true);
                return element;
            }
            case UI_ELEMENT.LABEL: {
                element = this._createDefaultLabel("Label");
                return element;
            }
            case UI_ELEMENT.TEXT_FIELD: {
                element = ui.TextField.create("EmptyFont", this._defaultFontSize);
                this._setSizing(element, this._defaultSizes.field, false);
                element.text = "Text field";
                element.color = 0x000000;
                return element;
            }
            case UI_ELEMENT.IMAGE_VIEW: {
                element = ui.ImageView.create("default_image");
                element.anchor.set(0.5);
                return element;
            }
            case UI_ELEMENT.SPRITE: {
                element = view.ComponentSprite.create("default_image");
                element.anchor.set(0.5);
                return element;
            }
            case UI_ELEMENT.CONTAINER: {
                element = view.ComponentContainer.create();
                return element;
            }
            case UI_ELEMENT.PROGRESS_BAR: {
                element = ui.ProgressBar.create(
                    "default_roundRect_over",
                    mCore.enumerator.DIRECTION.LEFT,
                    PROGRESS_TYPE.SIZE
                );
                this._setSizing(element, this._defaultSizes.progress, true);
                element.progress = 0.8;
                return element;
            }
            case UI_ELEMENT.SLIDER: {
                const ball = ui.ImageView.create("default_roundRect_over");
                this._setSizing(ball, this._defaultSizes.checkbox, true);
                element = ui.Slider.create(
                    ball,
                    mCore.enumerator.DIRECTION.LEFT,
                    "default_roundRect_up"
                );
                this._setSizing(element, this._defaultSizes.progress, false);
                element.progress = 0.8;
                element.progressBar.setSlice(6, 6, 6, 6);
                return element;
            }
            case UI_ELEMENT.TOGGLE_BUTTON: {
                element = ui.ToggleButton.create(
                    "default_roundRect_up",
                    "default_roundRect_up",
                    "default_roundRect_down",
                    "default_roundRect_down",
                    "default_roundRect_over",
                    "default_roundRect_over",
                    "default_roundRect_disabled",
                    "default_roundRect_disabled"
                );
                this._setSizing(element, this._defaultSizes.field, true);
                element.title = this._createDefaultLabel("Toggle button");
                element.title.position.set(40, 20);
                return element;
            }
            case UI_ELEMENT.CHECK_BOX: {
                /**
                 * @type {mCore.ui.CheckBox}
                 */
                element = ui.CheckBox.create(
                    "default_roundRect_up",
                    "default_check",
                    "default_roundRect_down",
                    "default_roundRect_over",
                    "default_roundRect_disabled"
                );
                this._setSizing(element, this._defaultSizes.checkbox, true);
                element.selected = true;
                element.icon.anchor.set(0.5);
                return element;
            }
            case UI_ELEMENT.SCROLL_VIEW: {
                element = ui.ScrollView.create(PANEL_GRAPHIC_TYPE.SPRITE, "default_roundRect_over");
                this._setSizing(element, this._defaultSizes.panel, true);
                element.innerWidth = this._defaultSizes.panel.width * 2;
                element.innerHeight = this._defaultSizes.panel.height * 2;
                return element;
            }
            case UI_ELEMENT.LIST_VIEW: {
                element = ui.ListView.create(PANEL_GRAPHIC_TYPE.SPRITE, "default_roundRect_over");
                this._setSizing(element, this._defaultSizes.panel, true);
                element.innerWidth = this._defaultSizes.panel.width * 2;
                element.innerHeight = this._defaultSizes.panel.height * 2;
                return element;
            }
            default:
                element = mCore.view.ComponentContainer.create();
                return element;
        }
    }

    _setSizing(element, size, isSliceEnabled = false) {
        if (isSliceEnabled) {
            element.setSlice(6, 6, 6, 6);
        }
        element.anchor.set(0.5);
        element.width = size.width;
        element.height = size.height;
    }

    _createDefaultLabel(text) {
        const {HORIZONTAL_ALIGN, VERTICAL_ALIGN} = mCore.enumerator.ui;
        /**
         * @type {mCore.ui.Label}
         */
        const result = ui.Label.create("EmptyFont", this._defaultFontSize);
        this._setSizing(result, this._defaultSizes.field, false);
        result.text = text;
        result.color = 0x000000;
        result.horizontalAlign = HORIZONTAL_ALIGN.CENTER;
        result.verticalAlign = VERTICAL_ALIGN.MIDDLE;
        return result;
    }

    _onZoomChange({data}) {
        this._root.scale.set(data);
    }

    _onOffsetChange({data}) {
        this._root.position.copyFrom(data);
    }
};
