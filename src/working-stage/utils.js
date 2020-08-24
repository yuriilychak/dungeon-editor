import { DEFAULT_SIZE, DEFAULT_TEXTURE } from "./enum";
import {
    DEFAULT_ANCHOR,
    DEFAULT_FONT_NAME,
    DEFAULT_FONT_SIZE,
    DEFAULT_PROGRESS,
    DEFAULT_SLICE,
    DEFAULT_TEXT_COLOR
} from "./constants";

const { mCore } = window;

const { view, ui, util, component } = mCore;
const { geometry }  = mCore.util;

function setSizing(element, size, isSliceEnabled = false) {
    if (isSliceEnabled) {
        element.setSlice(
            DEFAULT_SLICE,
            DEFAULT_SLICE,
            DEFAULT_SLICE,
            DEFAULT_SLICE
        );
    }
    element.anchor.set(DEFAULT_ANCHOR);
    element.width = size.width;
    element.height = size.height;
}

function createDefaultLabel(text) {
    const { HORIZONTAL_ALIGN, VERTICAL_ALIGN } = mCore.enumerator.ui;
    /**
     * @type {mCore.ui.Label}
     */
    const result = ui.Label.create(DEFAULT_FONT_NAME, DEFAULT_FONT_SIZE);
    setSizing(result, DEFAULT_SIZE.FIELD, false);
    result.text = text;
    result.color = DEFAULT_TEXT_COLOR;
    result.horizontalAlign = HORIZONTAL_ALIGN.CENTER;
    result.verticalAlign = VERTICAL_ALIGN.MIDDLE;
    return result;
}

function createTitle(element, title) {
    element.title = createDefaultLabel(title);
    element.title.position.copyFrom(util.geometry.pMult(util.geometry.pFromSize(element), DEFAULT_ANCHOR, true));
}

function setInnerSize(element, size) {
    element.innerWidth = util.math.multPowTwo(size.width);
    element.innerHeight = util.math.multPowTwo(size.height);
}

export function createElement(type, isRoot = false) {
    let element;

    const { UI_ELEMENT, PANEL_GRAPHIC_TYPE, PROGRESS_TYPE } = mCore.enumerator.ui;

    switch (type) {
    case UI_ELEMENT.WIDGET: {
        element = ui.Widget.create();
        element.width = DEFAULT_SIZE.PANEL.width;
        element.height = DEFAULT_SIZE.PANEL.height;
        element.anchor.set(DEFAULT_ANCHOR);
        break;
    }
    case UI_ELEMENT.BUTTON: {
        element = ui.Button.create(
            DEFAULT_TEXTURE.ROUND_RECT_UP,
            DEFAULT_TEXTURE.ROUND_RECT_DOWN,
            DEFAULT_TEXTURE.ROUND_RECT_OVER,
            DEFAULT_TEXTURE.ROUND_RECT_DISABLED
        );
        setSizing(element, DEFAULT_SIZE.FIELD, true);
        createTitle(element, "Button");
        break;
    }
    case UI_ELEMENT.PANEL: {
        element = ui.Panel.create(PANEL_GRAPHIC_TYPE.SPRITE, DEFAULT_TEXTURE.ROUND_RECT_OVER);
        setSizing(element, DEFAULT_SIZE.PANEL, true);
        break;
    }
    case UI_ELEMENT.LABEL: {
        element = createDefaultLabel("Label");
        break;
    }
    case UI_ELEMENT.TEXT_FIELD: {
        element = ui.TextField.create(DEFAULT_FONT_NAME, DEFAULT_FONT_SIZE);
        setSizing(element, DEFAULT_SIZE.FIELD, false);
        element.text = "Text field";
        element.color = DEFAULT_TEXT_COLOR;
        break;
    }
    case UI_ELEMENT.IMAGE_VIEW: {
        element = ui.ImageView.create(DEFAULT_TEXTURE.IMAGE);
        element.anchor.set(DEFAULT_ANCHOR);
        break;
    }
    case UI_ELEMENT.SPRITE: {
        element = view.ComponentSprite.create(DEFAULT_TEXTURE.IMAGE);
        element.anchor.set(DEFAULT_ANCHOR);
        break;
    }
    case UI_ELEMENT.CONTAINER: {
        element = view.ComponentContainer.create();
        break;
    }
    case UI_ELEMENT.PROGRESS_BAR: {
        element = ui.ProgressBar.create(
            DEFAULT_TEXTURE.ROUND_RECT_OVER,
            mCore.enumerator.DIRECTION.LEFT,
            PROGRESS_TYPE.SIZE
        );
        setSizing(element, DEFAULT_SIZE.PROGRESS, true);
        element.progress = DEFAULT_PROGRESS;
        break;
    }
    case UI_ELEMENT.SLIDER: {
        const ball = ui.ImageView.create(DEFAULT_TEXTURE.ROUND_RECT_OVER);
        setSizing(ball, DEFAULT_SIZE.CHECKBOX, true);
        element = ui.Slider.create(
            ball,
            mCore.enumerator.DIRECTION.LEFT,
            DEFAULT_TEXTURE.ROUND_RECT_UP
        );
        setSizing(element, DEFAULT_SIZE.PROGRESS, false);
        element.progress = DEFAULT_PROGRESS;
        element.progressBar.setSlice(
            DEFAULT_SLICE,
            DEFAULT_SLICE,
            DEFAULT_SLICE,
            DEFAULT_SLICE
        );
        break;
    }
    case UI_ELEMENT.TOGGLE_BUTTON: {
        element = ui.ToggleButton.create(
            DEFAULT_TEXTURE.ROUND_RECT_UP,
            DEFAULT_TEXTURE.ROUND_RECT_UP,
            DEFAULT_TEXTURE.ROUND_RECT_DOWN,
            DEFAULT_TEXTURE.ROUND_RECT_DOWN,
            DEFAULT_TEXTURE.ROUND_RECT_OVER,
            DEFAULT_TEXTURE.ROUND_RECT_OVER,
            DEFAULT_TEXTURE.ROUND_RECT_DISABLED,
            DEFAULT_TEXTURE.ROUND_RECT_DISABLED
        );
        setSizing(element, DEFAULT_SIZE.FIELD, true);
        createTitle(element, "Toggle button");
        break;
    }
    case UI_ELEMENT.CHECK_BOX: {
        /**
             * @type {mCore.ui.CheckBox}
             */
        element = ui.CheckBox.create(
            DEFAULT_TEXTURE.ROUND_RECT_UP,
            DEFAULT_TEXTURE.CHECK,
            DEFAULT_TEXTURE.ROUND_RECT_DOWN,
            DEFAULT_TEXTURE.ROUND_RECT_OVER,
            DEFAULT_TEXTURE.ROUND_RECT_DISABLED
        );
        setSizing(element, DEFAULT_SIZE.CHECKBOX, true);
        element.selected = true;
        element.icon.anchor.set(DEFAULT_ANCHOR);
        break;
    }
    case UI_ELEMENT.SCROLL_VIEW: {
        element = ui.ScrollView.create(PANEL_GRAPHIC_TYPE.SPRITE, DEFAULT_TEXTURE.ROUND_RECT_OVER);
        setSizing(element, DEFAULT_SIZE.PANEL, true);
        setInnerSize(element, DEFAULT_SIZE.PANEL);
        break;
    }
    case UI_ELEMENT.LIST_VIEW: {
        element = ui.ListView.create(PANEL_GRAPHIC_TYPE.SPRITE, DEFAULT_TEXTURE.ROUND_RECT_OVER);
        setSizing(element, DEFAULT_SIZE.PANEL, true);
        setInnerSize(element, DEFAULT_SIZE.PANEL);
        break;
    }
    default:
        element = mCore.view.ComponentContainer.create();
        break;
    }

    element.componentManager.addComponent(
        component.ui.ComUILayout.create()
    );

    element.userData = {
        leftMargin: 0,
        rightMargin: 0,
        topMargin: 0,
        bottomMargin: 0,
        marginLeftEnabled: false,
        marginRightEnabled: false,
        marginTopEnabled: false,
        marginBottomEnabled: false,
        interactive: true,
        stretchWidth: false,
        stretchHeight: false,
        isRoot
    };

    return element;
}

/**
 * @param {mCore.view.ComponentContainer} element
 * @param {mCore.geometry.Point} prevGlobal
 * @param {mCore.geometry.Point} nextGlobal
 */

export function updatePosition(element, prevGlobal, nextGlobal) {
    const prevLocal = element.parent.toLocal(prevGlobal);
    const nextLocal = element.parent.toLocal(nextGlobal);
    const offset = geometry.pSub(nextLocal, prevLocal);
    geometry.pAdd(element.position, offset, true);
}

export function updateAnchor(element, nextAnchor) {
    const offset = geometry.pCompMult(
        geometry.pSub(nextAnchor, element.anchor),
        geometry.pCompMult(
            geometry.pFromSize(element),
            element.scale
        )
    );

    const sin = Math.sin(element.rotation);
    const cos = Math.cos(element.rotation);

    element.anchor.copyFrom(nextAnchor);
    geometry.pAdd(element.position, mCore.geometry.Point.create(
        cos * offset.x - sin * offset.y,
        sin * offset.x + cos * offset.y
    ), true);
}

export function getAnchorPosition(element) {
    return geometry.pCompMult(geometry.pFromSize(element), element.anchor, true);
}
