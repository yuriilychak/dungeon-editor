import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";

import Button from "./button";
import MenuItem from "./menu-item";
import MenuList from "./menu-list";
import MenuBackground from "./menu-background";

export const MenuSection = props => {
    const { t } = useTranslation();
    const {locale, onOpen, onClose, onSelectSection, isOpen, sections, id, toggledSections} = props;
    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
        onOpen(id);
    }

    function handleClose() {
        setAnchorEl(null);
        onClose();
    }

    const sectionComponents = sections.map(section =>
        (<MenuItem
            onClick={ onSelectSection }
            key={section.id}
            isSelected={section.isToggle && toggledSections && toggledSections.includes(section.id)}
            {...section}
        />)
    );
    const growId = "menu-list-grow";

    return (
        <div>
            <Button
                aria-owns={isOpen ? growId : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
               {t(locale)}
            </Button>
            <Popper
                placement="bottom-start"
                open={isOpen}
                anchorEl={anchorEl}
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        id={growId}
                        style={{ transformOrigin: "left bottom" }}
                    >
                        <MenuBackground>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    {sectionComponents}
                                </MenuList>
                            </ClickAwayListener>
                        </MenuBackground>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};


export default memo(MenuSection);
