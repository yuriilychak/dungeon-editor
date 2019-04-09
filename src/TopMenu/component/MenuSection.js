import React, {memo} from 'react';
import Button from "./Button";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from './MenuItem';
import MenuList from './MenuList';
import MenuBackground from "./MenuBackground";
import { useTranslation } from "react-i18next";

const MenuSection = props => {
    const { t } = useTranslation();
    const {locale, onOpen, onClose, onSelectSection, isOpen, sections, id, toggledSections} = props;
    let anchorElement = null;
    const sectionComponents = sections.map(section => (
        <MenuItem
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
                buttonRef={node => {
                    anchorElement = node;
                }}
                aria-owns={isOpen ? growId : undefined}
                aria-haspopup="true"
                onClick={() => { onOpen(id) }}
            >
               {t(locale)}
            </Button>
            <Popper
                placement="bottom-start"
                open={isOpen}
                anchorEl={anchorElement}
                transition disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        id={growId}
                        style={{ transformOrigin: 'left bottom' }}
                    >
                        <MenuBackground>
                            <ClickAwayListener onClickAway={onClose}>
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
