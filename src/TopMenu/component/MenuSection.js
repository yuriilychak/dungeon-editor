import React, {Component} from 'react';
import Button from "./Button";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from './MenuItem';
import MenuList from './MenuList';
import MenuBackground from "./MenuBackground";

import { withTranslation } from 'react-i18next';

class MenuSection extends Component {
    render() {
        const {locale, t, onOpen, onClose, isOpen} = this.props;

        let anchorElement = null;

        return (
            <div>
                <Button
                    buttonRef={node => {
                        anchorElement = node;
                    }}
                    aria-owns={isOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={onOpen}
                >
                   {t(locale)}
                </Button>
                <Popper
                    placement="bottom-start"
                    open={isOpen} anchorEl={anchorElement} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
                        >
                            <MenuBackground>
                                <ClickAwayListener onClickAway={onClose}>
                                    <MenuList>
                                        <MenuItem onClick={onClose}>Profile</MenuItem>
                                        <MenuItem onClick={onClose}>My account</MenuItem>
                                        <MenuItem onClick={onClose}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </MenuBackground>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.isOpen !== nextProps.isOpen;
    }
}


export default withTranslation()(MenuSection);
