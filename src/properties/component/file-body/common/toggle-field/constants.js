import VisibilityIcon from '@material-ui/icons/Visibility';
import PanToolIcon from '@material-ui/icons/PanTool';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import {STAGE_ELEMENT_PROP} from "../../../../../enum";

const stylePrefix = "properties-toggle-field";

export const ICONS = {
    [STAGE_ELEMENT_PROP.VISIBLE]: VisibilityIcon,
    [STAGE_ELEMENT_PROP.INTERACTIVE]: PanToolIcon,
    [STAGE_ELEMENT_PROP.TEXT_AUTO_SIZE]: FormatSizeIcon,
    [STAGE_ELEMENT_PROP.STRETCH_WIDTH]: SwapHorizIcon,
    [STAGE_ELEMENT_PROP.STRETCH_HEIGHT]: SwapVertIcon
};

export const STYLES = {
    ROOT: `${stylePrefix}-root`,
    BUTTON: `${stylePrefix}-button`,
    BUTTON_UNCHECKED: `${stylePrefix}-button-unchecked`
};
