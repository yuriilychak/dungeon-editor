import { withStyles } from "@material-ui/core";
import { default as Element } from "@material-ui/core/MenuItem";
import React, {memo} from "react";
import { useTranslation } from 'react-i18next';
import Check from "@material-ui/icons/Check";

const height = 18;
const minWidth = 128;
const horizontalPadding = 8;

const menuItemStyles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        padding: `2px ${horizontalPadding}px`,
        height: height,
        minHeight: height,
        minWidth: minWidth,
        color: theme.palette.primary.contrastText,
        fontSize: "0.7rem",
        fontFamily: theme.typography.fontFamily,
        display: "grid",
        gridTemplateColumns: "1fr 32px"
    }
});

const iconStyle = {
    root: {
        marginRight: horizontalPadding,
        fontSize: "0.7rem"
    }
};

const leftRowStyle = {
    root: {
        float: "left",
        textAlign: "left"
    }
};

const rightRowStyle = {
    root: {
        float: "right",
        textAlign: "right",
        color: "#cccccc",
    }
};

const Icon = withStyles(iconStyle)(Check);
const Item = withStyles(menuItemStyles)(Element);
const createRow = style => withStyles(style)(props => <div className={props.classes.root}>{props.children}</div>);
const LeftRow = createRow(leftRowStyle);
const RightRow = createRow(rightRowStyle);
const EmptyIcon = () => (<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);

export const MenuItem = props => {
    const { t } = useTranslation();
    const { onClick, id, locale, hotKey, isSelected} = props;

    return (
        <Item onClick={() => { onClick(id) }}>
            <LeftRow>
                {isSelected ? <Icon/> : <EmptyIcon/>}
                {t(locale)}
            </LeftRow>
            <RightRow>{hotKey}</RightRow>
        </Item>
    )
};


export default memo(MenuItem);
